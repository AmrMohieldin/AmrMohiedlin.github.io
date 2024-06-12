/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  
  // Game Item Objects
  var KEY = {
    ENTER: 13,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
  };

  var walker = {
    posX: 0,
    posY: 0,
    speedX: 0,
    speedY: 0,
    width: 50,
  }

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           
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
    wallCollision()
    redrawGameItem()
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.LEFT) {
      walker.speedX = -5;
    }
    else if (event.which === KEY.UP) {
      walker.speedY = -5;
    }
    else if (event.which === KEY.DOWN) {
      walker.speedY = 5;
    }
    else if (event.which === KEY.RIGHT) {
      walker.speedX = 5;
    }
    
  }

  function handleKeyUp(event) {
    walker.speedX = 0;
    walker.speedY = 0;
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }

  function repositionGameItem() {
    walker.posX += walker.speedX;  // update the position of the box along the x-axis
    walker.posY += walker.speedY;  // update the position of the box along the y-axis

  }

  function redrawGameItem() {
    $("#walker").css("left", walker.posX); // draw the box in the new location, positionX pixels away from the "left"
    $("#walker").css("top", walker.posY); // draw the box in the new location, positionY pixels away from the "top"
  }

 
  function wallCollision() {
    if (walker.posX > $("#board").width() - walker.width || walker.posX < 0){
      walker.posX -= walker.speedX
    }
    if (walker.posY > $("#board").height() - walker.width || walker.posY < 0){
      walker.posY -= walker.speedY
    }
  }
  
}
