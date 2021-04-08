/*
var str = "the price of an item is: 100";
console.log(str);

var num = 100;
console.log(num);

var bool = true;
console.log(bool);

var obj;
console.log(obj);

obj = null;
console.log(obj);

var arr1 = [1,2,3,4,5];
console.log(arr1);

console.log(arr1[2]);

var arr2 = ["Ananya", 9, true];
console.log(arr2);

var arr3 = [[10,20,30],[40,50,60,70]];
console.log(arr3);

console.log(arr3[1][2]);
console.log(arr3[0][1])

arr3.push("Ananya");
console.log(arr3);

arr3.pop();
console.log(arr3);

var arr4 = [10,10];

var arr5 = [];
arr5.push(arr4);
console.log(arr5);
*/

const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1;
var backgroundImage,platform;
var bird, slingShot;
var gamestate = "onSling"


function preload() {
    getBackgroundImg();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:50});

}

function draw(){
    if(backgroundImage){
    background(backgroundImage);
    }
    Engine.update(engine);
    strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    platform.display();
    //log6.display();
    slingshot.display();    
}

function mouseDragged(){
    if(gamestate === "onSling"){
     Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    }
}


function mouseReleased(){
    gamestate = "launched"
    slingshot.fly();
}

function keyPressed(){
    if(keyCode=32){
        slingshot.attach(bird.body);
    }
}

async function getBackgroundImg(){
var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
var responseJSON = await response.json();
var dateTime = responseJSON.datetime
var hour = dateTime.slice(11,13);

if(hour>=06&&hour<19){
   backgroundImage = loadImage("sprites/bg.png");

}
else{
  backgroundImage = loadImage("sprites/bg2.jpg");
}

console.log(hour);
}