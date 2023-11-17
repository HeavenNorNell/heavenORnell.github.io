// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads.
$(document).ready(function () {
  render($("#display"), image);
  $("#apply").on("click", applyAndRender);
  $("#reset").on("click", resetAndRender);
});

/////////////////////////////////////////////////////////
//////// event handler functions are below here /////////
/////////////////////////////////////////////////////////

// this function resets the image to its original value; do not change this function
function resetAndRender() {
  reset();
  render($("#display"), image);
}

// this function applies the filters to the image and is where you should call
// all of your apply functions
function applyAndRender() {
  // Multiple TODOs: Call your apply function(s) here
  applyFilterNoBackground(increaseGreenByBlue);
  applyFilterNoBackground(reddify);
  applyFilter(decreaseBlue)


  // do not change the below line of code
  render($("#display"), image);
}

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1, 2 & 4: Create the applyFilter function here
function applyFilter(filterFunction) {
  for (i = 0; i < image.length; i++) {
    for (n = 0; n < image[i].length; n++) {
      let rgbString = image[i][n];
      let rgbNumbers = rgbStringToArray(rgbString);
      rgbNumbers = filterFunction(rgbNumbers);
      rgbString = rgbArrayToString(rgbNumbers);
      image[i][n] = rgbString
    }
  }
}

// TODO 7: Create the applyFilterNoBackground function
function applyFilterNoBackground(filterFunction) {
  bgColor = image[0][0];
  for (i = 0; i < image.length; i++) {
    for (n = 0; n < image[i].length; n++) {
      if (image[i][n] !== bgColor) {
        let rgbString = image[i][n];
        let rgbNumbers = rgbStringToArray(rgbString);
        rgbNumbers = filterFunction(rgbNumbers);
        rgbString = rgbArrayToString(rgbNumbers);
        image[i][n] = rgbString
      }
    }
  }
}

// TODO 5: Create the keepInBounds function
function keepInBounds(num) {
  return num < 0 ? 0 : num > 255 ? 255 : num;
}
// TODO 3: Create reddify function
function reddify(arr) {
  arr[0] = 200;
  return arr;
}

// TODO 6: Create more filter functions
function decreaseBlue(arr) {
  arr[2] = keepInBounds(arr[2] - 50);
  return arr;
}

function increaseGreenByBlue(arr) {
  arr[1] = keepInBounds(arr[1] + arr[2]);
  return arr;
}



// CHALLENGE code goes below here
