var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;
//var ob1,obstacle;

var form, player, game;

var player1,player2;

var track, player1_img,player2_img;

function preload(){
  track = loadImage("images/track.jpg");
  player1_img = loadImage("images/runner1.jpg");
  player2_img = loadImage("images/runner2.jpg");
  ground = loadImage("images/ground.png");
  obstacle = loadImage("images/download.png")
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
 
  
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  //if(hasCollided(runners,ob1)){
   // game.end()
 // }
  if(playerCount === 2){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
}
