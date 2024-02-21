/*
 * TODO 4: Create a modularized index.js,
 * pass in window and createjs
 */
(function (window, createjs) {
  // TODO 5: Initialize CreateJS //
  const canvas = document.getElementById("canvas");
  const stage = new createjs.Stage(canvas);

  // TODO 6: Set the framerate of the Ticker
  createjs.Ticker.framerate = 60;

  /*
   * TODO 7:CREATE AND CONFIGURE ANY DISPLAY
   * OBJECTS AND ADD THEM TO THE DISPLAY LIST HERE
   */

  // INIT CREATEJS //

  const radius = 25;
  const margin = 125;

  const circleContainer = new createjs.Container();

  // CREATE A BACKGROUND //

  const background = new createjs.Shape();
  background.graphics
    .beginFill("#80CED7")
    .drawRect(0, 0, canvas.clientWidth, canvas.height);

  // CREATE A CIRCLE //

  const circle1 = new createjs.Shape();
  const circle2 = new createjs.Shape();
  const brow = new createjs.Shape();
  const mouth = new createjs.Shape();

  circle1.graphics.beginFill("#FDF5BF").drawCircle(0, 0, radius);
  circle2.graphics.beginFill("#FFD5FF").drawCircle(0, 0, radius);
  brow.graphics
    .beginFill("#80CED7")
    .drawRect(0, canvas.height / 3.4, canvas.clientWidth, 100);
  mouth.graphics.beginFill("#3FA7D6").drawRect(canvas.width / 2 -20, 320, 20, 10);

  circle1.x = radius * 2 + margin;
  circle2.x = canvas.width - radius * 2 - margin;
  circle1.y = circle2.y = canvas.height / 2;

  // ADD DISPLAY OBJECTS TO STAGE //

  circleContainer.addChild(circle1, circle2, brow, mouth);
  stage.addChild(background, circleContainer);

  // TODO 8: Listen to the 'tick' event  //
  let tickhandler = createjs.Ticker.on("tick", onTick);

  // TODO 9: Handle the 'tick' event //
  function onTick(event) {
    update(event);
  }

  // variables that track movement

  let eyeSpeed = 1;
  let bounds = canvas.width;

  /*
   * TODO 10: Implement an update Function, after making
   * changes to assets, it must call stage.update();
   */

  function update(event) {
    circleContainer.x += eyeSpeed;
    stage.update();
    if (Math.abs(circleContainer.x) > bounds) {
      circleContainer.x = -bounds
    }
  }
})(window, window.createjs);
