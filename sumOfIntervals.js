// 30-12-21
//this is a clever solution found at https://github.com/vvscode/codewars/blob/master/sum-of-intervals/javascript/solution.js
// however seems to fail when the intervals given are negative. I will annotate to help understand how it works.
function sumIntervals(intervals) {
  let list = [];                              //create a blank list
  intervals.forEach(([a, b]) => {             //for each interval =>
    list.length = Math.max(list.length, b);   //set the list length to whichever is bigger, the current list length or the max val of the interval.
                                              //If you do this, the list becomes that length and each entry is undefined - clever! didn't know this!
    for (let i = a; i < b; i++) {             //still in the 'for each' loop, set i to a and increment by one up to b, exclusive            
      list[i] = 1;                            //put a 1 at index i, i.e. from a to b(exclusive).
                                              //This will overwrite any 1's already there from prior in the loop, solving overlap
    }
  });
  return list.reduce((a, b) => a + b, 0);     //outside of the forEach loop now, we have a list with 1's and undefined.
                                              //The reducer function takes (a,b), representing the previous and current values, 0 is the start index
}




let ronansIntervals = [
    [1,5],[4,12],[-10,-6]
]
console.log(sumIntervals(ronansIntervals)) // returns 11
// This (i think) should return 15 if the above function worked, instead it returns 11. Presumable -10 and -6 mean nothing when given as indices.

console.log(ronansIntervals[-1]) // i.e. this returns undefined.
console.log(ronansIntervals[ronansIntervals.length-1]) // this returns [-10,6], the final element of ronansIntervals

// Thinking of how to fix this to work for negatives:
// Instead of setting the list length to the highest value of b, set it to Math.abs(b-a).
// lets try an example of that:

let newList=[];
x = [1,10]
y = [-10,-1]
z = [5,6]
console.log(Math.abs(1-10))
newList.length = Math.abs(x[1]-x[0]) 
console.log(newList.length) // returns 9
newList.length = Math.abs(y[1]-y[0]) //also returns 9
//as can be seen, setting list.length to the absolute value won't work because both times the list gets reset to 9 - still no indices available
//to store negatives.

// One possibility is to create two lists...so if i is negative, a 1 can be put in the -i index of list2.
// To do this, an if-check would be needed so that if a is negative, list2.length = -a or list2.length, whichever is bigger
// Then a further if-check for i. If i is negative, place a 1 at index -i of list2.
// Reduce each list as before then add the two together
// I foresee a problem with 0 being counted twice, but lets burn that bridge when we get to it.

//My attempt, with new code commented with indented text:

function sumIntervals(intervals) {
  let list = [];                              //create a blank list
  let negList =[];                                        //create a blank list for negatives
  intervals.forEach(([a, b]) => {             //for each interval =>
    if (a<0){                                             //if a is less than 0, i.e. negative        
        negList.length = Math.max(negList.length,-a)      //set negList length to -a (which is positive) or the current length, whichever is biggest
    }
    list.length = Math.max(list.length, b);   //set the list length to whichever is bigger, the current list length or the max val of the interval.
                                              //If you do this, the list becomes that length and each entry is undefined - clever! didn't know this!
    for (let i = a; i < b; i++) {             //still in the 'for each' loop, set i to a and increment by one up to b, exclusive            
      if (i<0){
          negList[-i] = 1                                  //if i is negative, put a 1 at index -i (which is positive)
      }
      list[i] = 1;                            //put a 1 at index i, i.e. from a to b(exclusive).
                                              //This will overwrite any 1's already there from prior in the loop, solving overlap
    }
  });
  // return list.reduce((a, b) => a + b, 0);  //outside of the forEach loop now, we have a list with 1's and undefined.
                                                          //commented out the existing return function, will move this to var posCount
                                              //The reducer function takes (a,b), representing the previous and current values, 0 is the start index
  posCount = list.reduce((a, b) => a + b, 0);             //the former return value stored in var posCount
  negCount = negList.reduce((a,b) => a + b, 0);           //the count of negatives stored in var negCount
  return negCount + posCount;                             //add em together and return
  }

  //Testing this on Codewars.com, it beats the original as it succeeds on small random tests whereas the original failed.
  //However, it still times out on large tests, so it needs to be further optimised.
  //My worry about counting 0 twice seems to have been unfounded. I believe this is because -i will never equal 0 because
  //the if statements filter both a and i to be less than 0, so index 0 of negList will never be written with a 1.
  //I hope to come back to this problem at a later stage. This has been a pleasure to work on.


  // 31/12/21
  // I decided to come back and see if I can improve this further to prevent timing out.
  // Lets remind ourselves of the function so far, without the comments:

  function sumIntervals(intervals) {
    let list = [];                              
    let negList =[];
    const t0 = new Date().getTime();                                        
    console.log("you are here 1") 
    intervals.forEach(([a, b]) => {             
      if (a<0){                                             
          negList.length = Math.max(negList.length,-a)      
      }
      list.length = Math.max(list.length, b);   
                                                
      for (let i = a; i < b; i++) {             
        if (i<0){
            negList[-i] = 1                                  
        }
        list[i] = 1;                            
                                                
      }
    });
    const t1 = new Date().getTime();
    console.log(`forEach loop took ${t1 - t0} milliseconds.`);
    console.log("you are here 2")
    const t2 = new Date().getTime();                                                           
    posCount = list.reduce((a, b) => a + b, 0);             
    negCount = negList.reduce((a,b) => a + b, 0);           
    const t3 = new Date().getTime();
    console.log(`reduce took ${t2 - t3} milliseconds.`);
    return negCount + posCount;                             
    }

    // this appears to be timing out during the forEach loop
    // taking another look at my second attempt, it returns the full console log messages 7 times, but doesn't reach the 2nd message on the 8th,
    // so it is failing the 8th test. When I run it again, it seems to pass as many as 33 tests! 
    // The above version seems not even to pass the first test, so actually my own 2nd attempt is better than this solution. So, lets take a look at
    // my second attempt:


    function sumIntervals(intervals) {
      //second attempt: still times out
      // copy the first interval to a new array, and remove it from intervals.
      // loop over intervals for overlaps; if an overlap is found, adjust the values of the recorded interval
      // and remove the overlapping interval from intervals.
      // reset the loop to -1, so that it will go back to index 0 when incremented.
      // When this process is finished, run it again for the second interval.
      // keep doing this until intervals.length===0
      //  
      const t0 = new Date().getTime();
      let newArr = [];
        console.log("you are here 1") 
        while (intervals.length!==0)
       {//start of while
        newArr.unshift(intervals.shift())
          for (let i=0;i<intervals.length;i++){
          if (intervals.length===0){break}
          // comparing newArr [a,b]
          // against intervals [x,y]
          let a= newArr[0][0]; 
          let b= newArr[0][1];
          let x= intervals[i][0];
          let y= intervals[i][1];
          
          
          //five scenarios:
          //whenever [a,b] is changed, i must be set to -1
          //1.  a<x && b<x || x<a && y<a, no overlap, no change to either array
          if (a<x && b<x || x<a && y<a){
                                    continue}
          //2.  y>b && a<=x<=b, new array [a,y], intervals remove [x,y]
          if (y>b && a<=x && x<=b){ newArr[0][1]=y; intervals.splice(i,1); i=-1;
                                    continue}
          //3.  b>y && x<=a<=y, new array [x,b], intervals remove [x,y]
          if (b>y && x<=a && a<=y) {newArr[0][0]=x; intervals.splice(i,1); i=-1;
                                    continue}
          //4.  x<=a<=y && x<=b<=y, new array [x,y], intervals remove [x,y]
          if (x<=a && a<=y && x<=b && x<=y){newArr[0][0]=x;newArr[0][1]=y;intervals.splice(i,1);i=-1;
                                    continue}
          //5.  a<=x<=b && a<=y<=b, new array no change, intervals remove [x,y]
          if (a<=x && x<=b && a<=y && y<=b){intervals.splice(i,1);i--;
                                    continue}
          
          
        } //end of the comparison for loop
        } //end of while
        const t1 = new Date().getTime();
        console.log(`while loop took ${t1 - t0} milliseconds.`);
        
        sum=0;
        const t2 = new Date().getTime();
    
        for (item in newArr){
          sum+= newArr[item][1]-newArr[item][0]
        }
        console.log("you are here 2")
      const t3 = new Date().getTime();
      console.log(`sum took ${t2 - t3} milliseconds.`);
        return sum;
      }
    


// adding some time logs to the above confirms that it's the while loop that takes the bulk of the time. Sum takes 0 milliseconds to calculate.
// How can I make the while loop faster? Adding the same sorts of timestamps to version 3, I don't even get responses before it times out.
//
// The following was found at https://gist.github.com/jricaldi/4c29ca1d74845835532d3d1340d36e17
// it passes all tests without timing out, so I'm going to see if I can figure out what it does:

function sumIntervals(intervals){
intervals = intervals.sort(function(a, b) { // O(n) 
  return a[0] - b[0];
});
//^^^Sorts the arrays by the size of index 0, ie the start of interval
const t0 = new Date().getTime();
intervals = intervals.reduce(function(acc, el, index, array) { // O(n)
//^^^ this line starts a reduce function, acc=prev interval, el=current interval,
//    index=current index, array is the array iterated over
//    to keep things straight, lets call acc= [a,b] and el=[x,y]
  const anterior = array[index - 1];
// this line creates a variable called anterior and defines it as the previous interval
  if (array.length > 1 && anterior !== undefined) {
//if array is longer than 0 and anterior is defined...
    if (el[0] < acc[acc.length - 1]) {
    // ^^^if x < b
      if (el[1] >= acc[acc.length - 1]) {
        //and if y >= b...
        acc[acc.length - 1] = el[1];
        //set b to y
      }
    } else {
      acc.push(...el);
    // push [x,y] onto [a,b], so it becomes [a,b,x,y]
    // comes here if x > b
    }
  } else {
    acc.push(...el);
    // push [x,y] onto [a,b], so it becomes [a,b,x,y]
    // comes here if array is empty and anterior is undefined
  }
  return acc;
}, []);
const t1 = new Date().getTime();
console.log(`reduce took ${t1 - t0} milliseconds.`);
let result = 0;
console.log(intervals)
for (let i = 0; i < intervals.length - 1 ; i+=2) { // O(2n)
  result+=(intervals[i + 1] - intervals[i]);
}
return result;
} // O(n) + O(n) + O(2n) = 3O(n) = O(n)


// I'm going to work through this to see if I can make sense of what it is doing.

myIntervals = [
  [1,10],[-10,-1],[-10,-3],[-10,-9],[12,15],[6,7],[-7,-6]
]
console.log(myIntervals[0],myIntervals[1],myIntervals[2],myIntervals[3]);
myIntervals = myIntervals.sort(function(a, b) { // O(n)
return a[0] - b[0];
});
console.log(myIntervals[0],myIntervals[1],myIntervals[2],myIntervals[3]);
// so the first lines are simply putting the intervals in order of their start number.
// The rest of the code seems to then group overlapping intervals together.
// I'm going to take putting the intervals in order as my starting point for a more
// efficient algorithm, and worry about the rest of the code if I can't make it any
// more efficient once I've done that.
// This is what I came up with:


function sumIntervals(intervals) {
intervals = intervals.sort(function(a,b){
    return a[0]-b[0];
})
// this should sort intervals in order of the start of the interval
// now that our intervals are in order, lets take the array [[a,b],[x,y]]
// if x is less than b, then replace both intervals with the single interval [a,Math.max(b,y)]
// if x is greater than b, keep both arrays and move on
const t0 = new Date().getTime();
for (let i=1;i<intervals.length;i++){ //start at index 1, because we want to begin comparing [1] to [0]
  if (intervals.length>1){            //check there's more than one entry in intervals
    let a=intervals[i-1][0];
    let b=intervals[i-1][1];
    let x=intervals[i][0];
    let y=intervals[i][1];
    if (x<b){intervals[i-1][1]=Math.max(b,y);
            intervals.splice(i,1);
            i--}
  } 
}
const t1 = new Date().getTime();
console.log(`for loop took ${t1 - t0} milliseconds.`);
//
sum=0;
for (let item in intervals){
sum+=intervals[item][1]-intervals[item][0];
}
return sum;
}

// it is still too slow and times out, so I'm going to look at the time for my for loop vs the time for the 
// reduce function.

// for loop took 56 milliseconds.
// for loop took 84 milliseconds.
// for loop took 172 milliseconds.
// for loop took 64 milliseconds.
// for loop took 1939 milliseconds.
// for loop took 54 milliseconds.
// for loop took 120 milliseconds.
// for loop took 131 milliseconds.
// for loop took 7204 milliseconds.
// for loop took 56 milliseconds.
// for loop took 94 milliseconds.
// for loop took 44 milliseconds.
// for loop took 153 milliseconds.
// for loop took 117 milliseconds.
// for loop took 172 milliseconds.
// for loop took 78 milliseconds.

// reduce took 8 milliseconds.
// reduce took 4 milliseconds.
// reduce took 3 milliseconds.
// reduce took 1 milliseconds.
// reduce took 4 milliseconds.
// reduce took 3 milliseconds.
// reduce took 3 milliseconds.
// reduce took 2 milliseconds.
// reduce took 2 milliseconds.
// reduce took 3 milliseconds.
// reduce took 2 milliseconds.
// reduce took 3 milliseconds.
// reduce took 2 milliseconds.
// reduce took 3 milliseconds.
// reduce took 1 milliseconds.
// reduce took 1 milliseconds.
// reduce took 2 milliseconds.
// reduce took 3 milliseconds.
// reduce took 3 milliseconds.
// reduce took 2 milliseconds.

// Wow! The reduce function is a lot faster than my for loop! I'm going to see if I can rewrite my for loop as a reduce function.
// I just need to understand how the reduce function works!

//Eventually came up with this solution; the reducer function is much faster than the for loop.
// It has taken me a while to figure out how reduce works. I think I need to work through some more examples using it
// just so I can get used to applying it.

function sumIntervals(intervals) {
intervals = intervals.sort(function(a,b){
    return a[0]-b[0];
})

intervals = intervals.reduce(function(first, second, index){
    let a=first[0];
    let b=first[first.length-1];
    let x=second[0];
    let y=second[1];
    if (x<b){first[first.length-1]=Math.max(b,y);
    } else {
        first.push(...second);
    }
return first;
})
//
sum=0;
for (let i=0; i<intervals.length; i+=2){
sum+=intervals[i+1]-intervals[i];
}
return sum;
}


// Reflecting on this journey...
// I initially found someone else's solution which turned out to work less well than my first couple of attempts.
// I didn't notice this, but still learnt something new from that solution, and also fixed it so it worked as well
// as my own attempts.
// Then I found a much better solution which worked much faster than mine.
// By figuring out its principles, I managed to replicate what it did, learning my first use of the reducer function.