/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 10;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

  // Game Item Objects

  var head = jQuery('.head');

  let snakeHead = {
    "x": 100,
    "y": 100,
    "rotation": 1
  }
  let snake = [snakeHead];

  let apple = {
    "x": 10,
    "y": 10
  }

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('eventType', handleEvent);                           // change 'eventType' to the type of event you want to handle

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function moveBoxTo(newPositionX, newPositionY) {
    $(head).css("left", newPositionX);
    snakeHead.x = newPositionX;
    head.css("top", newPositionY);
    snakeHead.y = newPositionY;
  }
  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
//  1 = right, 2 = down, 3 = right, 4 = up
  function newFrame() {

$(document).on("keypress", function(e){
  if(e.key === "a"){
    snakeHead.rotation = 3;
  } else if(e.key === "w"){
    snakeHead.rotation = 4;
  } else if(e.key === "d"){
    snakeHead.rotation = 1;
  } else if(e.key === "s"){
    snakeHead.rotation = 2;
  } 
});
// 1 = right, 2 = down, 3 = left, 4 = up
    if(snakeHead.rotation === 1){
          moveBoxTo(snakeHead.x + 20, snakeHead.y);
        } else if(snakeHead.rotation === 2){
          moveBoxTo(snakeHead.x, snakeHead.y + 20);
        } else if(snakeHead.rotation === 3){
          moveBoxTo(snakeHead.x - 20, snakeHead.y);
        } else {
          moveBoxTo(snakeHead.x, snakeHead.y - 20);
        }


  }

  /* 
  Called in response to events.
  */
  function handleEvent(event) {

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

}
