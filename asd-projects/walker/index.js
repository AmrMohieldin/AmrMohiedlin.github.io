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
    W: 87,
    A: 65,
    S: 83,
    D: 68
  };

  var walker = {
    posX: 0,
    posY: 0,
    speedX: 0,
    speedY: 0,
    width: 50,
  }

  var walker1 = {
    posX: $("#board").width() - walker.width,
    posY: 0,
    speedX: 0,
    speedY: 0,
    width: 50,
  }
  // Code to make a random color
  var colors = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"]
  var colr = "#"
  var colr1 = "#"
  
  function getRandomIntInc(min, max) {
    const minCei = Math.ceil(min);
    const maxFlo = Math.floor(max);
    return Math.floor(Math.random() * (maxFlo - minCei + 1) + minCei)};


  function changeColor(){
    colr = "#"
    for (var i = 0; i < 6; i++){
      var hi = getRandomIntInc(0, 16)
      colr += colors[hi]
      }
    $("#walker1").css("background-color", colr); }
  
  function changeColor1(){
    colr1 = "#"
    for (let i = 0; i < 6; i++){
      var hi1 = getRandomIntInc(0, 16)
      colr1 += colors[hi1]
      
      }
    $("#walker").css("background-color", colr1); }

  


  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           
  $(document).on('keyup', handleKeyUp);
  $("#walker1").on('click', changeColor);
  $("#walker").on('click', changeColor1);

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
    else if (event.which === KEY.W) {
      walker1.speedY = -5;
    }
    else if (event.which === KEY.S) {
      walker1.speedY = 5;
    }
    else if (event.which === KEY.A) {
      walker1.speedX = -5;
    }
    else if (event.which === KEY.D) {
      walker1.speedX = 5;
    }
    
    
  }

  function handleKeyUp(event) {
    walker.speedX = 0;
    walker.speedY = 0;
    walker1.speedX = 0;
    walker1.speedY = 0;
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
    walker1.posX += walker1.speedX;  // update the position of the box along the x-axis
    walker1.posY += walker1.speedY;  // update the position of the box along the y-axis


  }

  function redrawGameItem() {
    $("#walker").css("left", walker.posX); // draw the box in the new location, positionX pixels away from the "left"
    $("#walker").css("top", walker.posY); // draw the box in the new location, positionY pixels away from the "top"
    $("#walker1").css("left", walker1.posX); // draw the box in the new location, positionX pixels away from the "left"
    $("#walker1").css("top", walker1.posY); // draw the box in the new location, positionY pixels away from the "top"
  }

  

 
  function wallCollision() {
    if (walker.posX > $("#board").width() - walker.width || walker.posX < 0){
      walker.posX -= walker.speedX
    }
    if (walker.posY > $("#board").height() - walker.width || walker.posY < 0){
      walker.posY -= walker.speedY
    }
    if (walker1.posX > $("#board").width() - walker.width || walker1.posX < 0){
      walker1.posX -= walker1.speedX
    }
    if (walker1.posY > $("#board").height() - walker.width || walker1.posY < 0){
      walker1.posY -= walker1.speedY
    }
  }
  
}
