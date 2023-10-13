/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 10;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var rect = board.getBoundingClientRect();
  var points = 0;
  // Game Item Objects

  var head = jQuery('.head');

  let snakeHead = {
    "x": 100,
    "y": 100,
    "rotation": 4
  }
  let snake = [snakeHead];

  let apple = {
    "x": 100,
    "y": 100
  }

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('eventType', handleEvent);                           // change 'eventType' to the type of event you want to handle

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function moveSquareTo(XEdit, YEdit){
    for(i = 0; i < snake.length - 1; i++){
      snake[i].x += XEdit;
      $("#" + i).css("left", snake[i].x)
      snake[i].y += YEdit;
      $("#" + i).css("top", snake[i].y)
    }
  }
  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  //  1 = right, 2 = down, 3 = left, 4 = up
  function newFrame() {
    handleKeypress();
    hasHitWall();
    checkRotation();
    hasHitApple();
    updateSpeed();
  }

  /* 
  Called in response to events.
  */
  function handleEvent(event) {

  }
  function handleKeypress() {
    $(document).on("keypress", function (e) {
      if (e.key === "a" && snakeHead.rotation !== 1) {
        snakeHead.rotation = 3;
      } else if (e.key === "w" && snakeHead.rotation !== 2) {
        snakeHead.rotation = 4;
      } else if (e.key === "d" && snakeHead.rotation !== 3) {
        snakeHead.rotation = 1;
      } else if (e.key === "s" && snakeHead.rotation !== 4) {
        snakeHead.rotation = 2;
      }
    });
  }
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function checkRotation() {
    // 1 = right, 2 = down, 3 = left, 4 = up
    if (snakeHead.rotation === 1) {
      moveSquareTo(20, 0);
    } else if (snakeHead.rotation === 2) {
      moveSquareTo(0, 20);
    } else if (snakeHead.rotation === 3) {
      moveSquareTo(-20, 0);
    } else {
      moveSquareTo(0, -20);
    }
  }

  // if (snakeHead.rotation === 1) {
  //   moveHeadTo(snakeHead.x + 20, snakeHead.y);
  // } else if (snakeHead.rotation === 2) {
  //   moveHeadTo(snakeHead.x, snakeHead.y + 20);
  // } else if (snakeHead.rotation === 3) {
  //   moveHeadTo(snakeHead.x - 20, snakeHead.y);
  // } else {
  //   moveHeadTo(snakeHead.x, snakeHead.y - 20);
  // }



  function updateSpeed() {

  }
  function hasHitApple() {
    if (snakeHead.x === apple.x && snakeHead.y === apple.y) {
      points++;
      updateApple();
    }
  }
  function updateApple() {
    apple.x = Math.floor(Math.random() * 22) * 20;
    $(".apple").css("left", apple.x);
    apple.y = Math.floor(Math.random() * 22) * 20;
    $(".apple").css("top", apple.y);
    $("p").text(points);
    makeSnakeSquare(points);
  }

  function makeSnakeSquare(num){
      //  1 = right, 2 = down, 3 = left, 4 = up
    var newSquare = {
      x : 0,
      y : 0
    }
    if(snake[0].rotation === 1){
      newSquare.x = snake[0].y + 20;
      newSquare.y = snake[0].y
    } else if(snake[0].rotation === 2){
      newSquare.x = snake[0].x;
      newSquare.y = snake[0].y - 20;
    } else if(snake[0].rotation === 3){
      newSquare.x = snake[0].x + 20;
      newSquare.y = snake[0].y;
    } else if(snake[0].rotation === 4){
      newSquare.x = snake[0].x;
      newSquare.y = snake[0].y - 20;
    }
    snake.push(newSquare)
    $("<div class = part id =" + points + ">").appendTo("body");
    console.log("<div class = part id =" + points + ">")
  }

  function hasHitWall() {
    if (rect.right - 60 < snakeHead.x && snakeHead.rotation === 1) {
      endGame()
    } else if (rect.left + 20 > snakeHead.x && snakeHead.rotation === 3) {
      endGame()
    } else if (rect.top + 20 > snakeHead.y && snakeHead.rotation === 4) {
      endGame()
    } else if (rect.bottom - 60 < snakeHead.y && snakeHead.rotation === 2) {
      endGame()
    }
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }

}
