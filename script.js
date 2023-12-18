var floorImg;
var floorPositionX = 0;
var backgroundImg;
var backgroundPositionX = 0;
var dinoImgs = [];
var currentDinoImg = 0;
var cactusImgs = []
var posXCactus

var jumping = false;
var jumpStartY;
var ySpeed;
var gravity = 1
var posYDino = 0.67
var velocidade = 15

var menu
let song
let soundPlayed = false;

function preload() {
    floorImg = loadImage('assets/floor.png');
    backgroundImg = loadImage('assets/bg.jpeg');
    song = loadSound('assets/song.mp3');
    
    for (var i = 1; i <= 2; i++) {
        cactusImgs.push(loadImage(`assets/cactus/cactus${i}.png`))
    }

    for (var i = 1; i <= 8; i++) {
        dinoImgs.push(loadImage(`assets/dino/${i}.png`));
    }

    menu = loadImage('assets/menu.gif');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    jumpStartY = windowHeight * posYDino
    ySpeed = 0 
    valorDoPulo = (-15 /windowHeight) * (windowHeight *2)
    posXCactus = windowWidth * 1.2
    // song.loop()
}

function draw() {
    // show menu
    image(menu, 0, 0, windowWidth, windowHeight);
    if (key === ' ') {
        menu.pause()
        if (!soundPlayed) {
            soundPlayed = true;
            song.loop();
        }
        gameStart()
    }
}

function gameStart() {
    background(0);
    verificaColisao()
    moveBackground();
    moveFloor();
    animateCactus();
    animateDino();
    applyGravity();
}

function verificaColisao() {
    if (
        windowWidth * 0.04 + dinoImgs[currentDinoImg].width/4 > posXCactus &&
        windowWidth * 0.04 < posXCactus + cactusImgs[1].width/4 &&
        jumpStartY + dinoImgs[currentDinoImg].height/4 > windowHeight * 0.65 &&
        jumpStartY < windowHeight * 0.65 + cactusImgs[1].height/4
    ){
        noLoop()
        textSize(50);
        fill(255);
        text("Game Over!", width / 2 - 100, height / 2);
    }
}

function animateCactus() {
    var posY = windowHeight * 0.65 
    var tamanho = posY / 3   
    image(cactusImgs[1], posXCactus, posY, tamanho, tamanho)

    posXCactus -= velocidade

    if (posXCactus < -width) {
        posXCactus = windowWidth * 1.2
    }
    
}

function animateDino() {
    var spriteDino;
    
    if (!jumping) {
        spriteDino = dinoImgs[currentDinoImg];
    } else {
        // Se está pulando, use a mesma sprite durante o salto
        spriteDino = dinoImgs[0];
    }
    
    image(spriteDino, windowWidth * 0.04, jumpStartY, windowWidth * 0.18, windowHeight * 0.2);

    if (!jumping && frameCount % 6 === 0) {
        currentDinoImg = (currentDinoImg + 1) % dinoImgs.length;
    }
}

function moveFloor() {
    var posY = windowHeight * .05
    image(floorImg, floorPositionX,         posY, windowWidth, windowHeight);
    image(floorImg, floorPositionX + width, posY, windowWidth, windowHeight);

    floorPositionX -= velocidade;
    if (floorPositionX < -width) {
        floorPositionX = 0;
    }
}

function moveBackground() {
    image(backgroundImg, backgroundPositionX, 10, windowWidth, windowHeight * 0.8);
    image(backgroundImg, backgroundPositionX + windowWidth, 10, windowWidth, windowHeight * 0.8);

    backgroundPositionX -= 0.3;

    if (backgroundPositionX < -windowWidth) {
        backgroundPositionX = 0;
    }
}

function applyGravity() {
    ySpeed += gravity;
    jumpStartY += ySpeed;

    if (jumpStartY > height * posYDino) {
      jumpStartY = height * posYDino;
      jumping = false;
    } else {
      jumping = true;
    }
}

function keyTyped() {
    if (!jumping && key === ' ') {
      ySpeed = valorDoPulo;
    }
  }

function mouseClicked() {
    if (!jumping) {
      ySpeed = valorDoPulo;
    }
  }