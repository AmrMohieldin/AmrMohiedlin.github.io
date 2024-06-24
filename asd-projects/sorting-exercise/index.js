/* IMPORTANT VALUES

This section contains a list of all variables predefined for you to use (that you will need)

The CSS ids you will work with are:

1. bubbleCounter -- the container for the counter text for bubble sort
2. quickCounter  -- the container for the counter text for quick sort

*/

///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES BELOW HERE /////////////////////
///////////////////////////////////////////////////////////////////////

// TODO 2: Implement bubbleSort 
// a function that sorts the bubbles from least to greatest
async function bubbleSort(arr){
    for (let i = 0; i < arr.length; i++){
        for (let j = arr.length - 1; j > i ; j--){
            if (arr[j].value < arr[j-1].value){
                swap(arr, j, j - 1);
                updateCounter(bubbleCounter);
                await sleep();
            }
        }

    }
    
}



// TODO 3: Implement quickSort
// Helps with the sorting
async function quickSort(arr, left, right){
if (right - left > 0){
    var index = await partition(arr, left, right);

    if (left < index - 1){
        await quickSort(arr, left, index - 1)
    }
    if (index < right){
        await quickSort(arr, index, right)
    }
}
}

// TODOs 4 & 5: Implement partition
// Helper function
async function partition(array, left, right){
 var pivot = array[Math.floor((right + left)/2)].value;
 while (left < right){
    while (array[left].value < pivot) {left++}
    while (array[right].value > pivot) {right--}
    if (left <= right){
        swap(array, left, right)
        updateCounter(quickCounter)
        await sleep();
    }
 }
 
 return left + 1;
}

// TODO 1: Implement swap
 // function to swap 2 parts of arrays

 function swap(arr, i, j){
    var hi = arr[i]
    arr[i] = arr[j]
    arr[j] = hi
    drawSwap(arr, i, j)
    }
   

///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES ABOVE HERE /////////////////////
///////////////////////////////////////////////////////////////////////

//////////////////////////// HELPER FUNCTIONS /////////////////////////

// this function makes the program pause by SLEEP_AMOUNT milliseconds whenever it is called
function sleep(){
    return new Promise(resolve => setTimeout(resolve, SLEEP_AMOUNT));
}

// This function draws the swap on the screen
function drawSwap(array, i, j){
    let element1 = array[i];
    let element2 = array[j];

    let temp = parseFloat($(element1.id).css("top")) + "px";

    $(element1.id).css("top", parseFloat($(element2.id).css("top")) + "px");
    $(element2.id).css("top", temp);
}

// This function updates the specified counter
function updateCounter(counter){
    $(counter).text("Move Count: " + (parseFloat($(counter).text().replace(/^\D+/g, '')) + 1));
}