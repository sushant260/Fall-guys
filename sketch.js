var PLAY=1,jumpy,dead,mile;
var END=0;
var gameState=PLAY;
var fallGuy,ground,invisibleGround,obstacleGroup,restartI,overI;
var fall_running,fall_collided,groundImage,restart,over,score=0;
var obstacle,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5;
function preload(){
  fall_running=loadAnimation("fall guys1.png","fall guys2.png");
  fall_collided=loadImage("dead fall guy.png")
  groundImage=loadImage("background.jpg");
  obstacle1=loadImage("obtacles.png");
  obstacle2=loadImage("obstacles 2.png");
  obstacle3=loadImage("obstacle 3.png");
  obstacle4=loadImage("obstacles 4.jpg");
  obstacle5=loadImage("obstacle 5.png");
  restartI=loadImage("fall restart.png");
  overI=loadImage("fall eliminated.jpg");
  dead=loadSound("tspt_vinyl_needle_scratch_01_095.mp3");
  jumpy=loadSound("zapsplat_impact_rock_small_land_amongst_leaves_bushes_001_11184.mp3");
  mile=loadSound("zapsplat_explosion_big_powerful_internal_002_48731.mp3");
  obstacleGroup=new Group();
}

function setup() {
  createCanvas(400,200)
  fallGuy=createSprite(50,165,10,10);
  fallGuy.addAnimation("running",fall_running);
  fallGuy.addAnimation("collided" , fall_collided);
  fallGuy.scale=0.05;
  fallGuy.setCollider("circle",0,0,400);
  
  over=createSprite(200,100,10,10);
  over.addImage(overI);
  over.scale=0.33;
  
  restart=createSprite(200,30,0,0);
  restart.addImage(restartI);
  restart.scale=0.3;
  
  invisibleGround=createSprite(200,193,800,17);
  invisibleGround.visible=false;
  
  ground=createSprite(200,100,20,20);
  ground.addImage(groundImage);
  ground.scale=0.135;
  fallGuy.depth=ground.depth;
  fallGuy.depth=fallGuy.depth+1;
  over.depth=ground.depth;
  over.depth=over.depth+0.2;
  restart.depth=ground.depth;
  restart.depth=restart.depth+0.3;
  invisibleGround.depth=ground.depth;
  invisibleGround.depth=invisibleGround.depth+1;
  score=0
  
}

function draw() {
 background(220);
  if (gameState===PLAY){
    score=score+(Math.round(getFrameRate()/60.986));
    if(score>0 && score%100 === 0){
     mile.play(); 
    }
    over.visible=false;
    restart.visible=false;
  
  if (keyDown("space")&&fallGuy.y>155) {
  fallGuy.velocityY = -10;
    jumpy.play();
}

fallGuy.velocityY = fallGuy.velocityY + 0.5;
    

fallGuy.collide(invisibleGround);
    if (obstacleGroup.isTouching(fallGuy)){
      gameState=END;
      dead.play();
    }
  }
  if (gameState===END){
    over.visible=true;
    restart.visible=true;
    fallGuy.changeAnimation("collided" , fall_collided);
     fallGuy.velocityY=0;
     fallGuy.velocityX=0;
    obstacleGroup.setLifetimeEach(-1);
    obstacleGroup.setVelocityXEach(0);
  }
   if(mousePressedOver(restart)) {
      reset();
    }

  if (frameCount%60===0){
  obstacle=createSprite(440,170,10,40);
     obstacle.scale=0.1;
    obstacleGroup.add(obstacle);
  obstacle.velocityX=-(5+ 3*score/100);
  var rand=(Math.round(random(1,5)));
  switch(rand){
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
  }
  }
  drawSprites();
  fill("Black");
  textSize(22);
  stroke("white");
  strokeWeight(2);
  text("score :" + score,280,20);
}
function reset(){
   gameState=PLAY;
   over.visible=false;
   restart.visible=false;
   obstacleGroup.destroyEach();
   fallGuy.changeAnimation("running",fall_running);
   score=0;
}
