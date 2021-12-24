var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var clouds, clouds_image
var obstacle, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6


var score;
var obstaclesGroup;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var gameOver, restart, gameOverImg, restartImg;

function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadImage("trex_collided.png");
  clouds_image = loadImage("cloud.png");
  groundImage = loadImage("ground2.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png")
  
}

function setup() {

  createCanvas(600,200)
  
  //crear sprite de trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  
  //crear sprite de suelo
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -6;
  
  //crear sprite de suelo invisible
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;

  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.6;

  restart = createSprite(300,130);
  restart.addImage(restartImg);
  restart.scale = 0.3;

  score = 0;

  obstaclesGroup = new Group();
  cloudsGroup = new Group();

  //generar números aleatorios
  var rand =  Math.round(random(1,100))
  //console.log(rand)

  trex.setCollider("circle", 0,0,40)
  //trex.debug = true;

}

function draw() {
  //establecer color de fondo
  background(180);
  

  fill("white");
  text("Score :"+ score,500,20);
  

  
  //console.log(trex.y)
  
  if(gamestate == PLAY){

    gameOver.visible = false;
    restart.visible = false;

    ground.velocityX = -6 ;
    score = score + Math.round((frameCount/60))

    if(keyDown("space")&& trex.y >= 100) {
      trex.velocityY = -10;
    }
    
    trex.velocityY = trex.velocityY + 0.8
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }

    spawnClouds()
    spawnObstacles();

    if(obstaclesGroup.isTouching(trex)){
      gamestate = END;
    }

    
    score = score + Math.round((frameCount/60))

  }else if(gamestate == END){
    ground.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);

    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    trex.changeAnimation("collided", trex_collided)
    trex.velocityY = 0 
    
    gameOver.visible = true;
    restart.visible = true;
  }
  
  
  //hacer que el trex salte al presionar la barra espaciadora

  
  //evitar que el trex caiga
  trex.collide(invisibleGround);
  
  //aparecer nubes

  drawSprites();
}

//función para aparecer las nubes
function spawnClouds(){
  if(frameCount % 50 == 0){
    clouds = createSprite(600, 50, 20,10);
    clouds.velocityX = -3;
    clouds.scale = 1;
    clouds.addImage(clouds_image);
    clouds.y = Math.round(random(10,60));
    console.log(trex.depth);
    console.log(clouds.depth);
    clouds.depth = trex.depth;
    clouds.lifetime = 220;
    trex.depth += 1;

    cloudsGroup.add(clouds);

  }

 
}

function spawnObstacles(){
  if (frameCount % 60 == 0){
    obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;

    var rand = Math.round(random(1,6));
    switch(rand){
      case 1:
        obstacle.addImage(obstacle1);
        break;
      case 2:
        obstacle.addImage(obstacle2);
      break;
      case 3:
        obstacle.addImage(obstacle3);
      break;
      case 4:
        obstacle.addImage(obstacle4);
      break; 
      case 5:
        obstacle.addImage(obstacle5);
      break;
      case 6:
        obstacle.addImage(obstacle6);
      break;
      }
      obstacle.scale = 0.5;
      obstacle.lifetime = 300;

      obstaclesGroup.add(obstacle);
  }
}



