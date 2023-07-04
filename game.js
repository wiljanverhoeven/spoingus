//set up the board
let board; //defines the board as a variable
let boardWidth = 750; //board height
let boardHeight = 250; //board width
let context;//used for drawing on the board

//set up spoingus the cat
let spoingusWidth = 88; //spoingus width
let spoingusHeight = 94;   //spoingus height
let spoingusX = 50;     //spoingus x position
let spoingusY = boardHeight - spoingusHeight; //spoingus y position
let spoingusimg; //defines spoingus image
let spoingus = { //spoingus object
    x : spoingusX, //spoingus x position
    y : spoingusY, //spoingus y position
    width : spoingusWidth, //spoingus width
    height : spoingusHeight //spoingus height
}

//set up cucumbers
let cucumbers = []; //array of five cucumbers
let cucumber1Width = 34; //cucumber1 width
let cucumber2Width = 69; //cucumber2 width
let cucumber3Width = 102; //cucumber3 width
let cucumberHeight = 70; //cucumbers height
let cucumberX = 700; //cucumbers x position
let cucumberY = boardHeight - cucumberHeight; //cucumbers y position
let cucumber1Img; //defines cucumber1 image
let cucumber2Img; //defines cucumber2 image
let cucumber3Img; //defines cucumber3 image

//physics
let velocityX = -8; //cucumber movement speed
let velocityY = 0;// spoingus jump hieght
let gravity = .4;// spoingus fall speed

//user interface variables
let gameOver = false; //game over boolean
let score = 0; //defines score
let pause = false; //pause boolean
let x = 1; //defines x

var weezer = new Audio('buddy-holly-weezer-guitar-lick.mp3'); //defines lose music music

function pauseGame() { //when the pause button is clicked the game will pause.
    pause = true; //sets pause boolean to true
    document.getElementById("resume").style.display = "inline"; //displays resume button
    document.getElementById("pause").style.display = "none"; //hides pause button
    document.getElementById("audioplayer").pause(); //pauses background music
}

function resumeGame() { //when the game is paused a resume button will appear and when clicked the game will resume.
    pause = false; //sets pause boolean to false
    document.getElementById("resume").style.display = "none"; //hides resume button
    document.getElementById("pause").style.display = "inline"; //displays pause button
    document.getElementById("audioplayer").play(); //plays background music
    update(); //runs the update function and resumes the game
}

function playGame() {	//when the start button is clicked the game will start.
    document.getElementById("hold").style.display = "inline"; //displays pause button
    board = document.getElementById("board"); //sets board to the board id from the html
    board.height = boardHeight; //sets board height
    board.width = boardWidth; //sets board width

    context = board.getContext("2d"); //used for drawing on the board
     
    //load images
    spoingusimg = new Image(); //defines spoingus image
    spoingusimg.src = "images/spoingus.png"; //sets spoingus image source
    spoingusimg.onload = function () { //when spoingus image loads it will be drawn on the board
        context.drawImage(spoingusimg, spoingus.x, spoingus.y, spoingus.width, spoingus.height); 
    }

    cucumber1Img = new Image(); //defines cucumber1 image
    cucumber1Img.src = "images/cucumber.png"; //sets cucumber1 image source

    cucumber2Img = new Image(); //defines cucumber2 image
    cucumber2Img.src = "images/cucumber2.png"; //sets cucumber2 image source

    cucumber3Img = new Image(); //defines cucumber3 image
    cucumber3Img.src = "images/cucumber3.png"; //sets cucumber3 image source

    requestAnimationFrame(update);
    setInterval(placeCucumbers, 1000); //sets an interval for placecucumbers every (1000 milliseconds = 1 second)
    document.addEventListener("keydown", moveSpoingus);  // when space or up arrow is pressed spoingus will jump
    document.getElementById("audioplayer").play(); //plays background music
    }

function update() { //runs every second to update the game
    if (pause) { //if the game is paused the game will not update
        return;
    }

    requestAnimationFrame(update); //updates the game

    if(gameOver) { //if there is a game over the game will stop updating
        document.getElementById("audioplayer").pause(); //pauses background music
        turnOn(); //turns on the game over screen
        return; 
    }

    context.clearRect(0, 0, board.width, board.height); //clears the board

    //spoingus
    velocityY += gravity; //adds gravity to velocityY
    spoingus.y = Math.min(spoingus.y + velocityY, spoingusY); //sets spoingus y position
    context.drawImage(spoingusimg, spoingus.x, spoingus.y, spoingus.width, spoingus.height); //draws spoingus

    //cucumbers
    for (let i = 0; i < cucumbers.length; i++) { //loops through cucumbers
        let cucumber = cucumbers[i]; //defines cucumber
        cucumber.x += velocityX; //sets cucumber x position
        context.drawImage(cucumber.img, cucumber.x, cucumber.y, cucumber.width, cucumber.height); //draws cucumber

    if (detectCollision(spoingus, cucumber)) { //if spoingus collides with a cucumber the game will end
        gameOver = true; //sets game over boolean to true
        weezer.play(); //plays the weezer song
        spoingusimg.src = "images/bingus.png"; //sets spoingus image to bingus
        spoingusimg.onload = function () { //when spoingus(bingus) image loads it will be drawn on the board
            context.drawImage(spoingusimg, spoingus.x, spoingus.y, spoingus.width, spoingus.height); //draws spoingus (bingus)
        }
    }
}

//score
context.fillStyle = "black"; //sets score color
context.font="20px Courier"; //sets score font
score++; //adds 1 to score
context.fillText(score, 5, 20); //draws score
} 

function moveSpoingus(e) { //when space or up arrow is pressed spoingus will jump
    if(gameOver) { //if the game is over spoingus will not jump
        return;
    }
    if ((e.code == "Space" || e.code == "ArrowUp") && spoingus.y == spoingusY) { //if space or up arrow is pressed and spoingus is on the ground spoingus will jump
        
        velocityY = -10; //sets velocityY to -10 so spoingus will jump
    }
}

function placeCucumbers() { //places cucumbers
    if(gameOver) { //if the game is over cucumbers will not be placed
        return;
    }
    if (pause) { //if the game is paused cucumbers will not be placed
        return;
    }
    
    //place cucumbers
    let cucumber = { //defines cucumber
        img : null, //sets cucumber image to null
        x : cucumberX, //sets cucumber x position
        y : cucumberY, //sets cucumber y position
        width : null, //sets cucumber width to null 
        height : cucumberHeight //sets cucumber height
    }

    let placeCucumberChance = Math.random(); //sets placeCucumberChance to a random number between 0 and 1

    if (placeCucumberChance > .90) { //if placeCucumberChance is greater than .90 cucumber1 will be placed
        cucumber.img = cucumber1Img; //sets cucumber image to cucumber1 image
        cucumber.width = cucumber1Width; //sets cucumber width to cucumber1 width
        cucumbers.push(cucumber); //adds cucumber to cucumbers array
    }
    else if (placeCucumberChance > .70) { //if placeCucumberChance is greater than .70 cucumber2 will be placed
        cucumber.img = cucumber2Img; //sets cucumber image to cucumber2 image
        cucumber.width = cucumber2Width; //sets cucumber width to cucumber2 width
        cucumbers.push(cucumber); //adds cucumber to cucumbers array
    }
    else if (placeCucumberChance > .50) { //if placeCucumberChance is greater than .50 cucumber3 will be placed
        cucumber.img = cucumber3Img; //sets cucumber image to cucumber3 image
        cucumber.width = cucumber3Width; //sets cucumber width to cucumber3 width
        cucumbers.push(cucumber); //adds cucumber to cucumbers array
    }

    if (cucumbers.length > 5) { //if cucumbers array is greater than 5
        cucumbers.shift(); //remove the first element from the array so that the array doesn't constantly grow
    }
}

function detectCollision(a, b) { //detects collision between spoingus and cucumbers
    return a.x < b.x + b.width &&   //a's top left corner doesn't reach b's top right corner
           a.x + a.width > b.x &&   //a's top right corner passes b's top left corner
           a.y < b.y + b.height &&  //a's top left corner doesn't reach b's bottom left corner
           a.y + a.height > b.y;    //a's bottom left corner passes b's top left corner
}

function restartGame() { //restarts the game
    location.reload(); //reloads the page
}

function turnOn() { //turns on the game over screen
    document.getElementById("youLost").style.display = "block"; //displays the game over screen 

    }








