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
  paddle1.x = 20;
  paddle1.y = 180;
  paddle1.width = 20;
  paddle1.height = 80;
  paddle1.speedY = 1;

  var paddle2 = {};
  paddle2.x = 400;
  paddle2.y = 180;
  paddle2.width = 20;
  paddle2.height = 80;
  paddle2.speedY = 1;

  var ball = {};
  ball.x = 20;
  ball.y = 180;
  ball.width = 20;
  ball.height = 80;
  ball.speedX = 1;
  ball.speedY = 1;
  ball.id = "#ball";


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
  }
  
  /* 
  Called in response to events.
  */

  

  function handleEvent(event) {
    if (event.which === KEY.UP) {
      paddle1.speedY = -5;
    }
    else if (event.which === KEY.DOWN) {
      paddle1.speedY = 5;
    }
    else if (event.which === KEY.W) {
      paddle2.speedY = -5;
    }
    else if (event.which === KEY.S) {
      paddle2.speedY = 5;
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
      if (paddle1.posY > $("#board").height() - paddle1.width || paddle1.posY < 0){
        paddle1.posY -= paddle1.speedY
      }
      if (paddle2.posY > $("#board").height() - paddle2.width || paddle2.posY < 0){
        paddle2.posY -= paddle2.speedY
      }
    }
  

  function repositionGameItem() {

    paddle1.posY += paddle1.speedY;  // update the position of the box along the y-axis
    paddle2.posY += paddle2.speedY;  // update the position of the box along the y-axis
  }

  function redrawGameItem() {
    $("#paddle1").css("top", paddle1.posY); // draw the box in the new location, positionY pixels away from the "top"
    $("#paddle2").css("top", paddle1.posY); // draw the box in the new location, positionY pixels away from the "top"
  }

  


  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
