/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////


  let walker = {
    "speedX": 0,
    "speedY": 0,
    "posX": 0,
    "posY": 0
  }

  let KEY = {
    "a": 65,
    "s": 83,
    "d": 68,
    "w": 87
  }
  
  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

  // Game Item Objects


  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', checkKey);
  $(document).on('keyup', function(){
    walker.speedX = 0;
    walker.speedY = 0;
  });
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    draw();
    move();
  }

  /* 
  Called in response to events.
  */
 
  function checkKey(event) {
    if (event.which === KEY.a) {
      walker.speedX = -5
    } else if (event.which === KEY.w) {
      walker.speedY = -5
    } else if (event.which === KEY.d) {
      walker.speedX = 5
    } else if (event.which === KEY.s) {
      walker.speedY = 5
    }
  };
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function draw() {
    $("#walker").css("left", walker.posX);
    $("#walker").css("top", walker.posY);
  }
  function move() {
    walker.posX += walker.speedX;
    walker.posY += walker.speedY;
  }
  function wallCollision(){
    if(posX <= 0 || posX >= $("#board").width()){
      walker.speedX = 0;
    } else if(posY <= 0 || posY >= $("#board").height()){
      walker.speedY = 0;
  }
}
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }

}
