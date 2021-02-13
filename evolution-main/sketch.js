var PLAY = 1;
var END = 0;
var PAUSE = -1;
var gameState = PLAY;
var CONTINUE=2;

var cell, cellrunnig, cellcollided;
var ground, invisibleGround, groundImage, backgg, bg;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1;
var obstacle1, backg;
var cellin, cool,tissue,tis;
var yes, no;
var yeah, nope;
var count,vote;

var score = 0;
localStorage["HighestScore"] = 0;


function preload() {
  cellrunning = loadImage("cell.png");
  cellcollided = loadImage("sadcell.png");

  groundImage = loadImage("ground.jpg");
  backgg = loadImage("backg.png");

  cloudImage = loadImage("cloud.png");

  obstacle1 = loadImage("stone.png");
  obstacle2 = loadImage("obs.png");
  obstacle3 = loadImage("obss.png");
  obstacle4 = loadImage("obsss.png");
  obstacle5 = loadImage("obsssss.png");
  obstacle6 = loadImage("obssssssss.png");
  cellin = loadImage("cellin.png");
  yes = loadImage("y.png");
  no = loadImage("n.png");
  tis=loadAnimation("tissue.png");

}

function setup() {
  createCanvas(1000, 600);
  backg=createSprite(500,300);
  backg.addImage("ok",backgg)
  backg.x = backg.width / 2;
  backg.velocityX=-5;
  backg.scale =2.2;

  cell = createSprite(80, 430, 10, 10);

  cell.addImage("running", cellrunning);
  cell.addImage("collided", cellcollided);
  cell.scale = 0.5;
  

  cool = createSprite(450, 250, 555, 1014);
  cool.visible = false;
  cool.addImage("ainwai", cellin);
  cool.scale = 1;

  yeah = createSprite(300, 500, 20, 20);
  yeah.addImage("yo", yes);
  yeah.visible=false;

  nope = createSprite(700, 500, 20, 20);
  nope.addImage("nah", no)
  nope.visible=false;
  ground = createSprite(500, 580, 1000, 10);
  ground.scale = 1;


  ground.x = ground.width / 2;
  ground.velocityX = -(6 + 3 * score / 100);





  invisibleGround = createSprite(500, 590, 1000, 7);
  invisibleGround.visible = false;

  cloudsGroup = new Group();
  obstaclesGroup = new Group();


  score = 0;
}

function draw() {

  background(255);
 
  text("Score: " + score, 500, 50);
  

  if (gameState === PLAY) {
    score = score + Math.round(getFrameRate() / 60);
    ground.velocityX = -(6 + 3 * score / 100);

    if (keyDown("space") && cell.y >= 159) {
      cell.velocityY = -12;
    }

    cell.velocityY = cell.velocityY + 0.8

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    console.log(backg.x);
    if (backg.x < 0) {
      backg.x = backg.width / 2;
    }

    cell.collide(invisibleGround);
    spawnClouds();
    spawnObstacles();

    if (obstaclesGroup.isTouching(cell)) {
      gameState = END;
    }
  }
  // else if (gameState === CONTINUE) {
    
  //   tissue = createSprite(80, 430, 10, 10);
  // tissue.addImage("ti",tis);
  // tissue.scale=0.5;
  //   score = score + Math.round(getFrameRate() / 60);
  //   ground.velocityX = -(6 + 3 * score / 100);

  //   if (keyDown("space") && tissue.y >= 159) {
  //     tissue.velocityY = -12;
  //   }

  //   tissue.velocityY = tissue.velocityY + 0.8

  //   if (ground.x < 0) {
  //     ground.x = ground.width / 2;
  //   }
  //   console.log(backg.x);
  //   if (backg.x < 0) {
  //     backg.x = backg.width / 2;
  //   }

  //   tissue.collide(invisibleGround);
  //   spawnClouds();
  //   spawnObstacles();

  // }

  else if (gameState === PAUSE) {
    
    ground.velocityX = 0;
    cell.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    console.log("Reached in pause state");
    ground.visible=false;
    cell.visible=false
    obstaclesGroup.visible=false;
    cloudsGroup.visible=false;
    backg.visible=true;
  }
   
  else if (gameState === END) {


    
    ground.velocityX = 0;
    cell.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);

    
    cell.changeAnimation("collided", cellcollided);

    
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);

    

  }
  
  
  
  drawSprites();
  if (score === 500) {
    gameState = PAUSE;
    cool.visible=true;
    
  // if(score===1000){
  //   stroke("yellow");
  //   fill("green");
  //   textSize(30);
  //   var count;
  //   switch (count) {
  //     case 1: text("Is cell the smallest unit of life?")
  //       break;
  //       //ans is yes
  //     case 2: text("Is the DNA present in the nucleus of cell");
  //       break;
  //       //ans is yes
  //     case 3: text("Are lysosymes and ribosomes the same?")
  //       break;
  //       //ans is no
  //     case 4: text("Is mitochondria present in cell?")
  //       break;
  //       //ans is  yes
  //     case 5: text("Are Eukaryotic and Prokaryotic cells the same?")
  //       break;
  //       //ans is no
      
  //     default: break;
  //   }
  // }

// yeah.visible=true;
// nope.visible=true;
// gameState=PAUSE;
// if (mousePressedOver(yeah)) {
  
//   count=count+1;

// }
// if (mousePressedOver(nope)) {
//   vote=vote+1
// }

  }


}

function spawnClouds() {
  
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600, 120, 40, 10);
    cloud.y = Math.round(random(80, 120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;

   
    cloud.lifetime = 200;

    
    cloud.depth = cell.depth;
    cell.depth = cell.depth + 1;

    
    cloudsGroup.add(cloud);
  }


}

function spawnObstacles() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(300, 450, 10, 40);
    
    obstacle.velocityX = -(6 + 3 * score / 100);

    
    var rand = Math.round(random(1, 6));
    switch (rand) {
      case 1: obstacle.addImage(obstacle1);
        break;
      case 2: obstacle.addImage(obstacle2);
        break;
      case 3: obstacle.addImage(obstacle3);
        break;
      case 4: obstacle.addImage(obstacle4);
        break;
      case 5: obstacle.addImage(obstacle5);
        break;
      case 6: obstacle.addImage(obstacle6);
        break;
      default: break;
    }
    


    
    obstacle.scale = 0.5

    obstacle.lifetime = 300;
    
    obstaclesGroup.add(obstacle);
  }
}

// function playon() {
//   gameState = CONTINUE;

// score=0;
  

  

// }




