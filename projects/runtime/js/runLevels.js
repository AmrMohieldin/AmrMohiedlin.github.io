var runLevels = function (window) {
  window.opspark = window.opspark || {};

  var draw = window.opspark.draw;
  var createjs = window.createjs;
  let currentLevel = 0;

  window.opspark.runLevelInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game
    var levelData = window.opspark.levelData;

    // set this to true or false depending on if you want to see hitzones
    game.setDebugMode(true);

    // TODOs 5 through 11 go here
    // BEGIN EDITING YOUR CODE HERE
    function makeObs (x,y, scale1, hitSize) {
    var hitZoneSize = hitSize;
    var damageFromObstacle = 10;
    var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
    sawBladeHitZone.x = x;
    sawBladeHitZone.y = y;
    game.addGameItem(sawBladeHitZone);
    var obstacleImage = draw.bitmap("https://file.removal.ai/preview/7645b3e8-0dc5-4841-abac-00eec756f2ff-hollow-purple.png");
    sawBladeHitZone.addChild(obstacleImage);
    obstacleImage.scaleX = scale1;
    obstacleImage.scaleY = scale1;
    obstacleImage.x = -hitZoneSize - (hitSize*7/6);
    obstacleImage.y = -hitZoneSize - (hitSize*7/6);
    }

   

    

    function createEnemy(x) {
      var enemy = game.createGameItem("enemy", 25);
      var redSquare = draw.bitmap("https://file.removal.ai/preview/5f0f9db1-5119-4131-9b63-4f984f9b1e48-mahoraga.png");
      enemy.addChild(redSquare);
      redSquare.scaleX = 1;
      redSquare.scaleY = 1;
      redSquare.x = -100;
      redSquare.y = -75;
      enemy.x = x;
      enemy.y = groundY - 70 ;
      game.addGameItem(enemy);
      enemy.velocityX = -1;
      enemy.onPlayerCollision = function () {game.changeIntegrity(-50)};
      enemy.onProjectileCollision = function () {
      game.increaseScore(100);
      enemy.flyTo(1800,300);}
      
    }

    //createEnemy(750);    
    

    function reWard(x, y){
      var enemy1 = game.createGameItem("enemy1", 25);
      var redSquare1 = draw.bitmap("https://file.removal.ai/preview/ad62274d-ca5b-420e-be56-8992892186bb-sukunas-finger.png");
      enemy1.addChild(redSquare1);
      redSquare1.scaleX = .6;
      redSquare1.scaleY = .6;
      redSquare1.x = 5 - 25 * 2;
      redSquare1.y = -35 - 25 * 7/6;
      enemy1.x = x;
      enemy1.y = groundY - (y-480);
      game.addGameItem(enemy1);
      enemy1.velocityX = -1;
      enemy1.onPlayerCollision = function () {
        game.changeIntegrity(+50)
        enemy1.flyTo(1800,300)}
        
    }

   // reWard(500, 50);

    function endLevel(x){
      var enemy2 = game.createGameItem("enemy2", 25);
      var redSquare2 = draw.bitmap("https://file.removal.ai/preview/8f8a5ec9-44de-428a-955e-35dcb00a84d4-nanami.png");
      enemy2.addChild(redSquare2);
      redSquare2.scaleX = 1;
      redSquare2.scaleY = 1;
      redSquare2.x = -80;
      redSquare2.y = -200;
      enemy2.x = x;
      enemy2.y = groundY - 50;
      game.addGameItem(enemy2);
      enemy2.velocityX = -1;
      enemy2.onPlayerCollision = function () {
        startLevel()}
        
    }
    var currentlevel = 0; 
    // endLevel(2000)
    function startLevel() {
      // TODO 13 goes below here
      var currentLevel =+ 1;
      var level = levelData[currentLevel];
      var gameObjects = level.gameItems;
      
      
      for (var i = 0; i < gameObjects.length; i++) {
        var eachElement = gameObjects[i];
        var firstX = eachElement.x;
        var firstY = eachElement.y;   
        var firstType = eachElement.type;

        if (firstType === "sawblade"){
          makeObs(firstX, firstY, 0.5, 15)
        } 
        else if (firstType === "enemy"){
          createEnemy(firstX)
        }
        else if (firstType === "reward"){
          reWard(firstX, firstY)
        }
        else { endLevel(firstX, firstY)} 
        
      }
      //////////////////////////////////////////////
      // DO NOT EDIT CODE BELOW HERE
      //////////////////////////////////////////////
      if (++currentLevel === levelData.length) {
        startLevel = () => {
          console.log("Congratulations!");
        };
      }
    }
    startLevel();
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = runLevels;
}
