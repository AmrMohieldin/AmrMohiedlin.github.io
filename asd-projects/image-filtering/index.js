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
  applyFilter(reddify)
  applyFilterNoBackground(decreaseBlue)
  applyFilterNoBackground(increaseGreenByBlue)
  

  // do not change the below line of code
  render($("#display"), image);
}

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1, 2 & 4: Create the applyFilter function here
function applyFilter(filterFunction){
  for (var r = 0; r < image.length; r++){
  var row = image[r]
    for (var c = 0; c < row.length; c++){
    var rgbString = row[c];
    var rgbNumbers = rgbStringToArray(rgbString)
    filterFunction(rgbNumbers)
    rgbString = rgbArrayToString(rgbNumbers)
    row[c] = rgbString
    }
  }
}


// TODO 7: Create the applyFilterNoBackground function
function applyFilterNoBackground(filterFunction){
  var backG = image[0][0]
  for (var r = 0; r < image.length; r++){
  var row = image[r]
    for (var c = 0; c < row.length; c++){
      var rgbString = row[c];
      if (backG !== rgbString){
        var rgbNumbers = rgbStringToArray(rgbString)
        filterFunction(rgbNumbers)
        rgbString = rgbArrayToString(rgbNumbers)
        row[c] = rgbString}
      }
  }
}

// TODO 5: Create the keepInBounds function
var hi1;
function keepInBounds(no1){
  hi1 = no1 > 255 ? 255: no1 < 0 ? 0: no1
  return hi1
}

// TODO 3: Create reddify function
function reddify(array) {
  array[RED] = 200;
}

// TODO 6: Create more filter functions
function decreaseBlue(arr){
arr[BLUE] = keepInBounds(arr[BLUE] - 50);
}

function increaseGreenByBlue(arr1){
  arr1[GREEN] = keepInBounds(arr1[BLUE] + arr1[GREEN]);

}

// CHALLENGE code goes below here
