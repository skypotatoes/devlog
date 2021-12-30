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