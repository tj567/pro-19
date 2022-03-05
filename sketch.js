var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";

function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  //spookySound.loop();
  tower = createSprite(300, 300);
  tower.addImage(towerImg);
  tower.velocityY = 1;

  ghost = createSprite(200, 200);
  ghost.scale = 0.3;
  ghost.addImage(ghostImg);

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
}

function draw() {
  background(0);
  if (gameState === "play") {
    if (keyDown("left_arrow")) {
      ghost.x = ghost.x - 5;
    }
    if (keyDown("right_arrow")) {
      ghost.x = ghost.x + 5;
    }
    if (keyDown("space")) {
      ghost.velocityY = -5;
    }
    ghost.velocityY += 0.7;

    if (tower.y > 400) {
      tower.y = 300;
    }
    spawnDoors();

    if (climbersGroup.isTouching(ghost)) {
      ghost.velocityY = 0;
    }

    if (ghost.isTouching(invisibleBlockGroup) || ghost.y > 600) {
      ghost.destroy();
      gamerState = "end";
    }
  
  drawSprites();
}
  if(gameState==="end"){
   text("game over",230,250)
   }
}



function spawnDoors() {
  //write code here to spawn the doors in the tower
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200, 10);
    var invisibleBlock = createSprite(200, 15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;

    door.x = Math.round(random(120, 400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    door.addImage(doorImg);
    climber.addImage(climberImg);
    door.velociityY = 1;
    climber.velocityY = 1;
    invisibleBlock.veloCityY = 1;

    ghost.depth = door.depth;
    ghost.depth += 1;
    door.lifeTime = 800;
    climber.lifeTime = 800;
    invisibleBlock.lifeTime = 800;

    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}
