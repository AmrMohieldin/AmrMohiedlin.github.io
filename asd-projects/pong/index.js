/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  
  // Game Item Objects
  var paddle1 = {};
  paddle1.posX = 20;
  paddle1.posY = 180;
  paddle1.width = 20;
  paddle1.height = 80;
  paddle1.speedY = 0;

  var paddle2 = {};
  paddle2.posX = 400;
  paddle2.posY = 180;
  paddle2.width = 20;
  paddle2.height = 80;
  paddle2.speedY = 0;

  var ballSpeed = (Math.random() * 3 + 2) 
  var ballSpeedY = (Math.random() * 2 + 1) * (Math.random() > 0.5 ? -1 : 1);

  var ball = {};
  ball.x = 80;
  ball.y = 180;
  ball.width = 20;
  ball.height = 80;
  ball.speedX = ballSpeed;
  ball.speedY = ballSpeedY;
  ball.id = "#ball";

  var score1 = 0;
  var score2 = 0;

  var KEY = {
    UP: 38,
    DOWN: 40,
    W: 83,
    S: 87
  };


  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleEvent);                           
  $(document).on('keyup', handleKeyUp);

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem()
    redrawGameItem()
    wallCollision()
    checkWhoWon()
  }
  
  /* 
  Called in response to events.
  */

  

  function handleEvent(event) {
    if (event.which === KEY.UP) {
      paddle2.speedY = -5;
    }
    else if (event.which === KEY.DOWN) {
      paddle2.speedY = 5;
    }
    else if (event.which === KEY.W) {
      paddle1.speedY = 5;
    }
    else if (event.which === KEY.S) {
      paddle1.speedY = -5;
    }}

    function handleKeyUp(event) {
      paddle1.speedY = 0;
      paddle2.speedY = 0;
    }


    // functions to deal with movement
      ////////////////////////////////////////////////////////////////////////////////
      ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////

    function wallCollision() {
      if (paddle1.posY > $("#board").height() - paddle1.height || paddle1.posY < 0){
        paddle1.posY -= paddle1.speedY
      }
      if (paddle2.posY > $("#board").height() - paddle2.height || paddle2.posY < 0){
        paddle2.posY -= paddle2.speedY
      }
      if (ball.y > $("#board").height() - 20 || ball.y < 0){
        ball.speedY *= -1
      }
      if (ball.x > $("#board").width() - 20){
        ball.x = 220
        ball.y = 220
        score1 += 1
        $("#score1").text("Score: " + score1)}
        
        if (ball.x < 0){
        ball.x = 220
        ball.y = 220
        score2 += 1
        $("#score2").text("Score: " + score2)}
    
      if (ball.x - 10 < 20 && paddle1.posY <= ball.y && ball.y >= paddle1.posY + 40 || ball.x + 10 >= paddle2.posX && paddle2.posY <= ball.y && ball.y >= paddle2.posY + 40) {
           ball.speedX *= -1
           ball.speedY *= -1
      }}
      
    
  

  function repositionGameItem() {

    paddle1.posY += paddle1.speedY;  // update the position of the box along the y-axis
    paddle2.posY += paddle2.speedY;  // update the position of the box along the y-axis
    ball.x += ball.speedX;
    ball.y += ball.speedY; 
  }

  function redrawGameItem() {
    $("#paddle1").css("top", paddle1.posY); // draw the box in the new location, positionY pixels away from the "top"
    $("#paddle2").css("top", paddle2.posY); // draw the box in the new location, positionY pixels away from the "top"
    $("#ball").css("top", ball.y); // draw the box in the new location, positionY pixels away from the "top"
    $("#ball").css("left", ball.x); // draw the box in the new location, positionY pixels away from the "left"
  }

  function checkWhoWon(){
    if (score1 >= 11){
      $("#winner").text("Player 1 wins!")
      endGame()}
    if (score2 >= 11){
      $("#winner").text("Player 2 wins!")
      endGame()}
    
  }  
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();

    
  }
 


}
