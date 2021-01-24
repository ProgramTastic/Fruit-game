var PLAY = 1;
var END = 0;
var gameState = PLAY;


var fruitGroup, fruit, fruit1, fruit2, fruit3, fruit4;

var sword, swordImage;

var enemyGroup;
var monster, monsterImage, monster_moving;

var gameOverImage;

var knifeSwooshSound, gameOverSound;


function preload(){
  
  swordImage = loadImage("sword.png");
  
  gameOverImage = loadImage("gameover.png");
  
  
  fruit1 = loadImage("fruit1.png");
  
  fruit2 = loadImage("fruit2.png");
  
  fruit3 = loadImage("fruit3.png");
  
  fruit4 = loadImage("fruit4.png");
  
  monster_moving = loadAnimation("alien1.png","alien2.png");
  
  knifeSwooshSound = loadSound("knifeSwooshSound.mp3");
  
  gameOverSound = loadSound("gameover.mp3");
}

function setup(){
  
  sword = createSprite(40,200,20,20);
  sword.addImage(swordImage);
  
  
  score = 0;
  fruitGroup = createGroup();
  enemyGroup = createGroup();
  
}

function draw(){
  background("lightblue");
  
  
  if (gameState === PLAY){
    
    sword.y = World.mouseY;
    sword.x = World.mouseX;
    
    fruits();
    Enemy();
    
  } 
  
  else if (gameState === END){
    
    fruitGroup.velocityX = 0;
    enemyGroup.velocityX = 0;
    sword.addImage(gameOverImage);
    sword.x = 200;
    sword.y = 200;
    
  }
  
  if (fruitGroup.isTouching(sword)){
    
    fruitGroup.destroyEach();
    score=score+2;
    
    knifeSwooshSound.play();
    
  }
  
  if (enemyGroup.isTouching(sword)){
    
    gameState = 0;
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
    
    gameOverSound.play();
    
  }
  
  textSize(15);
  text("Score: " + score, 300,25);
  
  drawSprites();

}


function fruits(){
  
  if (World.frameCount % 80 === 0){
    
    var fruit = createSprite(400,200,20,20);
    fruit.scale = 0.2;
    
    
    ra = Math.round(random(1,4));
    
    if (ra == 1){
      
      fruit.addImage(fruit1);
      
    } else if (ra == 2){
      
      fruit.addImage(fruit2);
      
    } else if (ra == 3){
      
      fruit.addImage(fruit3);
      
    } else {
      
      fruit.addImage(fruit4);
      
    }
    
    fruit.y = Math.round(random(50,340));
    
    fruit.velocityX = -(7+(score/4));
    fruit.setLifetime = 100;
    
    fruitGroup.add(fruit);
    
  }
  
  
}

function Enemy(){
  
  if (World.frameCount% 200 === 0 ){
    
    var monster = createSprite(400,200,20,20);
    monster.addAnimation("moving",monster_moving);
    
    monster.y = Math.round(random(100,300));
    monster.velocityX = -(8+(score/10));
    monster.setLifetime = 50;
    
    enemyGroup.add(monster);
    
    
  }
  
}
