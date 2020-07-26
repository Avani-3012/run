class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

 
    
  }
  
  
  
  
  play(){
    form.hide();
    
    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      background(ground);
      image(track,0,-displayHeight*4, displayWidth , displayHeight*5)
      //var display_position = 100;
      for(var i = 100 ; i<displayHeight ; i=i+100){
        ob1 = createSprite(random(0,displayWidth),i);
        ob1.addImage("download",obstacle);
        }
        player1 = createSprite(100,200);
        player1.addImage("runner1",player1_img)
        player2 = createSprite(500,200)
        player2.addImage("runner2",player2)
        runners [player1,player2];
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        runners[index-1].x = x;
        runners[index-1].y = y;

        if (index === player.index){
          stroke(10);
          fill("Red")
          ellipse(x,y,60,60)
          runners[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
      //console.log(player.distance)
    }


    if(player.distance > 3490){
      gameState = 2;
    }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
    game.update(2)
  }
}
