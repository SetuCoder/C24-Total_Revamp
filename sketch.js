const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

var engine, world, body;

var ground, tankBody, tankTurret;
var rotatedDegrees;
var bullet, bullets;
var ball1, ball2, ball3, ball4;
var targets;
var result;
var deaths;

function preload(){
  bgimg = loadImage("sprites/image.jpg")
}

function baseClamp(number, lower, upper) {
  if (number === number) {
    if (upper !== undefined) {
      number = number <= upper ? number : upper;
    }
    if (lower !== undefined) {
      number = number >= lower ? number : lower;
    }
  }
  return number;
}


function setup() {
  //setup
  engine = Engine.create();
  world = engine.world;
  createCanvas(800,400);
  targets = 4;
  result = "";

  //create ground
  ground = new Ground(600, 390, 1200, 30);

  //create tank body/turret
  tankBody = new TankBody(660, 350, 200, 75);
  tankTurret = new TankTurret(590, 330, 100, 20);

  //create targets
  ball1 = new Ball(50, 300, 25);
  ball2 = new Ball(50, -2500, 20);
  ball3 = new Ball(50, -7500, 15);
  ball4 = new Ball(50, -15000, 20);


  //set variables
  rotatedDegrees = 0;
  bullets = [];
  deaths = [false, false, false, false];
}

function draw() {
  background(127,220,165);  

  //update the engine
  Engine.update(engine);
  
  //display ground
  ground.display();

  //display tank
  tankBody.display();
  tankTurret.display();

  //rotating the turret
  if(keyIsDown(UP_ARROW) && rotatedDegrees < 100){
    tankTurret.rotateUp();
    rotatedDegrees++;
  }

  if(keyIsDown(DOWN_ARROW) && rotatedDegrees > 1){
    tankTurret.rotateDown();
    rotatedDegrees--;
  }

  //display bullets
  for(var x = 0; x < bullets.length; x++){
    if(bullets[x].body.position.y > 365){
      Matter.World.remove(world, bullets[x].body);
    }else{
      bullets[x].display();
    }
  }

  //move the balls closer and display them or remove them
  if(ball1.body.position.x < -50 && deaths[0] === false){
    Matter.Body.setPosition(ball1.body, {x: 0, y: -1000});
    Matter.World.remove(world, ball1);
    targets--;
    deaths[0] = true;
  }else{
    ball1.display();

    if(ball1.body.position.y > 340 && deaths[0] === false){
      Matter.Body.setVelocity(ball1.body, {x: 1, y: -7});
    }
  }

  if(ball2.body.position.x < -50 && deaths[1] === false){
    Matter.World.remove(world, ball2);
    Matter.Body.setPosition(ball2.body, {x: 0, y: -1000});
    targets--;
    deaths[1] = true
  }else{
    ball2.display();

    if(ball2.body.position.y > 340 && deaths[1] === false){
      Matter.Body.setVelocity(ball2.body, {x: 1.5, y: -12});
    }
  }

  if(ball3.body.position.x < -50 && deaths[2] === false){
    Matter.World.remove(world, ball3);
    Matter.Body.setPosition(ball3.body, {x: 0, y: -1000});
    targets--;
    deaths[2] = true;
  }else{
    ball3.display();

    if(ball3.body.position.y > 350 && deaths[2] === false){
      Matter.Body.setVelocity(ball3.body, {x: 2, y: -5});
    }
  }

  if(ball4.body.position.x < -50 && deaths[3] === false){
    Matter.World.remove(world, ball4);
    Matter.Body.setPosition(ball4.body, {x: 0, y: -1000});
    targets--;
    deaths[3] = true;
  }else{
    ball4.display();

    if(ball4.body.position.y > 345 && deaths[3] === false){
      Matter.Body.setVelocity(ball4.body, {x: 5, y: -8});
    }
  }

  //display you win if you win or you lost if you lost
  if(targets === 0){
    result = "win";
  }
  
  if(ball1.body.position.x >= 530 || ball2.body.position.x >= 530
    || ball3.body.position.x >= 530 || ball4.body.position.x >= 530){
      result = "loss";
  
  }

  if(result === "win"){
    fill(0);
    textSize(40);
    textAlign(CENTER);
    text("YOU WIN!", 400, 200);
  }else if(result === "loss"){
    fill(0);
    textSize(40);
    textAlign(CENTER);
    text("YOU LOSE!", 400, 200);
  }

  //how to play
  fill(0);
  textSize(18);
  textAlign(CENTER);
  text("Help!!! Aliens are Firing their bombs! \nThe Aleo-Nuggets ARE COMING!\nQuick Soldier, Use The Up/Down Arrow Keys To Aim\nAnd hit Space Bar To Fire\n Don't let those nuggets get ya, otherwise humanity is doomed.", 400, 50);
}

function keyPressed(){
  if(keyCode === 32 && result !== "loss"){
    var speed = baseClamp(rotatedDegrees/5, 4, 10);
    bullet = new Bullet(0, 0, 30, 10, rotatedDegrees, speed);
    Matter.Body.setPosition(bullet.body, {x: tankTurret.body.position.x - 50, y: tankTurret.body.position.y - rotatedDegrees/3});
    bullets.push(bullet);
  }
}