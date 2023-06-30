//score
let board;
let boardWidth = 750;
let boardHeight = 250;
let context;

//spoingus
let spoingusWidth = 88;
let spoingusHeight = 94;
let spoingusX = 50;
let spoingusY = boardHeight - spoingusHeight;
let spoingusimg;

let spoingus = {
    x : spoingusX,
    y : spoingusY,
    width : spoingusWidth,
    height : spoingusHeight
}

//cucumbers
let cucumbers = [];

let cucumber1Width = 34;
let cucumber2Width = 69;
let cucumber3Width = 102;

let cucumberHeight = 70;
let cucumberX = 700;
let cucumberY = boardHeight - cucumberHeight;

let cucumber1Img;
let cucumber2Img;
let cucumber3Img;

//physics
let velocityX = -8; //cucumber movement speed
let velocityY = 0;
let gravity = .4;

let gameOver = false;
let score = 0;

window.onload = function () {	
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;

    context = board.getContext("2d"); //used for drawing on the board
     
    //load images
    spoingusimg = new Image();
    spoingusimg.src = "images/spoingus.png";
    spoingusimg.onload = function () {
        context.drawImage(spoingusimg, spoingus.x, spoingus.y, spoingus.width, spoingus.height);
    }

    cucumber1Img = new Image();
    cucumber1Img.src = "images/cucumber.png";

    cucumber2Img = new Image();
    cucumber2Img.src = "images/cucumber2.png";

    cucumber3Img = new Image();
    cucumber3Img.src = "images/cucumber3.png";

    requestAnimationFrame(update);
    setInterval(placeCucumbers, 1000); //1000 milliseconds = 1 second
    document.addEventListener("keydown", moveSpoingus);
    }

function update() {
    requestAnimationFrame(update);
    if(gameOver) {
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






