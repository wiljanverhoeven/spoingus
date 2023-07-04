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
    setInterval(placeCucumbers, 1000); //1000 milliseconds = 1 second
    document.addEventListener("keydown", moveSpoingus);
    document.getElementById("audioplayer").play();
    }

function update() {
    if (pause) {
        return;
    }
    requestAnimationFrame(update);
    if(gameOver) {
        document.getElementById("audioplayer").pause();
        turnOn();
        return; 
    }
    context.clearRect(0, 0, board.width, board.height);

    //spoingus
    velocityY += gravity;
    spoingus.y = Math.min(spoingus.y + velocityY, spoingusY);
    context.drawImage(spoingusimg, spoingus.x, spoingus.y, spoingus.width, spoingus.height);

    //cucumbers
    for (let i = 0; i < cucumbers.length; i++) {
        let cucumber = cucumbers[i];
        cucumber.x += velocityX;
        context.drawImage(cucumber.img, cucumber.x, cucumber.y, cucumber.width, cucumber.height);

    if (detectCollision(spoingus, cucumber)) {
        gameOver = true;
        spoingusimg.src = "images/bingus.png";
        spoingusimg.onload = function () {
            context.drawImage(spoingusimg, spoingus.x, spoingus.y, spoingus.width, spoingus.height);
        }
    }
}

//score
context.fillStyle = "black";
context.font="20px Courier";
score++;
context.fillText(score, 5, 20);
} 

function moveSpoingus(e) {
    if(gameOver) {
        return;
    }
    if ((e.code == "Space" || e.code == "ArrowUp") && spoingus.y == spoingusY) {
        //jump
        velocityY = -10;
    }
    else if (e.code == "ArrowDown" && spoingus.y == spoingusY) {
        //duck
    }
}

function placeCucumbers() {
    if(gameOver) {
        return;
    }
    if (pause) {
        return;
    }
    
    //place cucumbers
    let cucumber = {
        img : null,
        x : cucumberX,
        y : cucumberY,
        width : null,
        height : cucumberHeight
    }

    let placeCucumberChance = Math.random();

    if (placeCucumberChance > .90) {
        cucumber.img = cucumber1Img;
        cucumber.width = cucumber1Width;
        cucumbers.push(cucumber);
    }
    else if (placeCucumberChance > .70) {
        cucumber.img = cucumber2Img;
        cucumber.width = cucumber2Width;
        cucumbers.push(cucumber);
    }
    else if (placeCucumberChance > .50) {
        cucumber.img = cucumber3Img;
        cucumber.width = cucumber3Width;
        cucumbers.push(cucumber);
    }

    if (cucumbers.length > 5) {
        cucumbers.shift(); //remove the first element from the array so that the array doesn't constantly grow
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&   //a's top left corner doesn't reach b's top right corner
           a.x + a.width > b.x &&   //a's top right corner passes b's top left corner
           a.y < b.y + b.height &&  //a's top left corner doesn't reach b's bottom left corner
           a.y + a.height > b.y;    //a's bottom left corner passes b's top left corner
}

function restartGame() {
    location.reload();
}

function turnOn() {
    document.getElementById("youLost").style.display = "block";
}







