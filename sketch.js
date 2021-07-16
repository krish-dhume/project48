var PLAY=1;
var END=0;
var gameState=1;
var score=0;
var backImg,spaceship,spaceshipImg,asteroid,asteroidGroup,asteroidImg,lazerGroup;
var lazer,lazerImg
var restart,restartImg,gameOver,gameOverImg;


function preload(){
  backImg=loadImage("Space.jpg");
  spaceshipImg=loadImage("SpaceCraft.jpg");
  asteroidImg=loadImage("Meteo.jpg");
  lazerImg=loadImage("Lazer Beam.jpg");
  gameOverImg=loadImage("GameOver.png");
  restartImg=loadImage("Reestart.jpg")
}
function setup(){
  createCanvas(displayWidth,displayHeight);

  spaceship=createSprite(displayWidth/2,550,30,70);
  spaceship.addImage(spaceshipImg);
  spaceship.scale=0.5;

 

  restart=createSprite(displayWidth/2,displayHeight/2-200,20);
  restart.addImage( restartImg);
  restart.scale=0.08;
  
  gameOver=createSprite(displayWidth/2,displayHeight/2,20,20);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.5;

 asteroidGroup=new Group(); 
 lazerGroup=new Group();
}
function draw(){
  background(backImg);

  if(asteroidGroup.isTouching(spaceship)){
    gameState=END;
  }


  if(asteroidGroup.isTouching(lazerGroup)){
    asteroidGroup.destroyEach();
    gameState=PLAY;
    score=score+2;
   }
 
if(gameState===PLAY){
  restart.visible=false;
  gameOver.visible=false;

  if(keyDown("space")){
    createLazer();
  }
 
  asteroidium();

  if(keyWentDown(UP_ARROW)){
    spaceship.velocityY=-5;
  }
  if(keyWentDown(DOWN_ARROW)){
    spaceship.velocityY=5;
  }
  if(keyWentDown(RIGHT_ARROW)){
    spaceship.velocityX=5;
  }
  if(keyWentDown(LEFT_ARROW)){
    spaceship.velocityX=-5;
  }

  if(keyWentUp(UP_ARROW)){
    spaceship.velocityY=0;
  }
  if(keyWentUp(DOWN_ARROW)){
    spaceship.velocityY=0;
  }
  if(keyWentUp(RIGHT_ARROW)){
    spaceship.velocityX=0;
  }
  if(keyWentUp(LEFT_ARROW)){
    spaceship.velocityX=0;
  }
  

}
 else if(gameState===END){
  restart.visible=true;
  //boy.visible=false;
  gameOver.visible=true;
asteroidGroup.setVelocityYEach(0);
spaceship.velocityX=0;
spaceship.velocityY=0;

textSize(24);
fill("yellow")
  text("Please Press on restart icon to replay the game",displayWidth/2,displayHeight/2-400);
 
  score=0;
  asteroidGroup.destroyEach();
  
if(mousePressedOver(restart)){
  Restart();
}
  
}



  drawSprites();

  textSize(24);
  fill("white");
  text("Score:"+score,displayWidth/2-400,displayHeight/4-150)
}
function asteroidium(){
  if(frameCount%80===0){
  asteroid=createSprite(200,10,30,50);
  asteroid.addImage(asteroidImg);
  asteroid.scale=0.5;
  asteroid.velocityY=-(-8+(-score/2));
  asteroid.x=Math.round(random(displayWidth/2+30,displayWidth/2+250,displayWidth/2+100,displayWidth/2-200,displayWidth/2+500,displayWidth/2-500,displayWidth/4-250,displayWidth/2+600,displayWidth/2-350,displayHeight/2-400,displayWidth/4-100));
  
  asteroidGroup.add(asteroid);
  console.log(asteroid.x)
  }
}
function createLazer(){
   lazer=createSprite(spaceship.x,450,30,50);
  lazer.x=spaceship.x;
  lazer.addImage(lazerImg);
  lazer.scale=0.09;
  lazer.velocityY=-5;

  lazerGroup.add(lazer);
}
function Restart(){
gameState=PLAY;
spaceship.x=displayWidth/2;
spaceship.y=550;
gameOver.visible=false;
restart.visible=false;

}