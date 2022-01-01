//01/01/22
//
//started on this kata yesterday: https://www.codewars.com/kata/57f9bbe759eb61a049000160
//For the sake of completeness, I put my first attempt below, but I have abandoned this as it gets locked in an infinite loop
//on the first test, setting the digits of ABC to 123 into eternity.
function guessExpression(exp) {
    //to start with lets just try and get the expression into three neat packages, 
    //the top letters, the bottom letters and the number
    exp = exp.split("\n");
    exp.splice(2, 1);

    let top = "";
    let bottom = "";
    let answer = "";

    let letters = /[A-Z]/
    let digits = /\d/

    for (let i = 0; i < exp[0].length; i++) {
        if (exp[0][i].match(letters)) {
            top += exp[0][i]
        }
    }

    for (let i = 0; i < exp[1].length; i++) {
        if (exp[1][i].match(letters)) {
            bottom += exp[1][i]
        }
    }

    for (let i = 0; i < exp[2].length; i++) {
        if (exp[2][i].match(digits)) {
            answer += exp[2][i]
        }
    }


    // now we have top, bottom and answer
    // now for the maths...
    // each letter in top is x10^(top.length-1-top[index])
    // i.e ABC is A00, B0 and C
    // top is length 3
    // so A is index 0, 3-1-0=2, 10^2=100, so A00
    // B is index 1, 3-1-1=1, 10^1=10, so B0
    // C is index 2, 3-1-2=0, 10^0=1, so C

    // lets create an object to store letters (key) against a digit (value);
    //
    let obj = {}
    let topSum = 0;
    let bottomSum = 0;
    let digitsLeft = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    // we're going to start by giving the digit 1 to the rightmost letter in top
    // as we encounter new letters, we'll increment the digit

    while ((topSum * bottomSum !== parseInt(answer))) {

        for (let i = 0; i < top.length; i++) {
            if (obj.hasOwnProperty(top[i])) {
                topSum += (obj.top[i]) * Math.pow(10, top.length - top[i])
            } else {
                obj[top[i]] = digitsLeft[0];
                console.log((obj[top[i]] * Math.pow(10, top.length - obj[top[i]])))
                topSum += (obj[top[i]] * Math.pow(10, top.length - obj[top[i]]));
                digitsLeft.shift();
            }

        }
        console.log(obj)
        for (let j = 0; j < bottom.length; j++) {
            bottomSum += obj[bottom[j]] * (Math.pow(10, bottom.length - obj[top[j]]))
        }
        obj = {}
        topSum = 0;
        bottomSum = 0;
        digitsLeft = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
    return (`${topSum} * ${bottomSum} = ${answer}`);
}
//Rather than try to fix the above, I'm going to think through how to go about solving it and start from scratch.
//I don't think my choice of an object to store the key:value pairs of letter:digit is appropriate, because I will want to access each item by index.
//Instead, for the top expression I will create a list in the form [['A',1],['B',2],['C',3]]. There may be problems in accessing the correct values in
//this list, but I will burn that bridge when I come to it.
//
//I will copy the first part of my previous attempt, which just takes the given expression and divides it into 3 variables,
//top = the top list of letters
//bottom = the bottom list of letters
//answer = the digits at the bottom of the given expression
function guessExpression(exp) {
    exp = exp.split("\n");
    exp.splice(2, 1);

    let top = "";
    let bottom = "";
    let answer = "";

    let letters = /[A-Z]/
    let digits = /\d/

    for (let i = 0; i < exp[0].length; i++) {
        if (exp[0][i].match(letters)) {
            top += exp[0][i]
        }
    }

    for (let i = 0; i < exp[1].length; i++) {
        if (exp[1][i].match(letters)) {
            bottom += exp[1][i]
        }
    }

    for (let i = 0; i < exp[2].length; i++) {
        if (exp[2][i].match(digits)) {
            answer += exp[2][i]
        }
    }

    //I'm going to start by creating the array from top, which should give our letter-digit pairs.
    //We will iterate over top. If the letter at that digit is already in our array, we will skip it.
    ///If it is not in the array, we will add a pair which will be [ Letter , array.length]. This will ensure
    //that for the starting array, the highest digit will always be 1, the subsequent one 2, and so on.

    //Having experimented with accessing arrays within arrays, it seems I cannot find the index of a particular
    //array - see tests below on myArray. I think this is because javascript will not accept identical arrays as
    //being equal to one another because they are still different objects, a problem I have encountered before.
    //Instead, I will resort to a simple list. Even indices will store the letter and the next index will store 
    //the digit. 

    //array:
    // index     0   1   2   3   4   5
    // value    'A'  1  'B'  2  'C'  3
    // length    1   2   3   4   5   6

    let array = []
    for (let i = 0; i < top.length; i++) {
        //first check if the letter at index i is already in the array
        //if it is, do nothing
        //if it isn't, push the letter to the array
        //the push the appropriate digit - [index-2]+1
        // now see if my working out is correct:
        console.log("top[i]: " + top[i])
        if (array.indexOf(top[i]) === -1) {
            if (array.length === 0) {
                array.push(top[i]);
                array.push(1)
            } else {

                array.push(top[i]);
                array.push(array[array.length - 2] + 1)
            }
        }
    }
    //this generates the appropriate array e.g. array = ['A',1,'B',2,'C',3]
    //From this list we will generate topSum and bottomSum
    //Lets think about the example ABC
    //This === A00 + B0 + C (if you imagine the letters as a digit 1-9)
    // A at top[0], B at top[1], C at top[2]
    // A x 10^2,    B x 10^1,    C x 10^0
    // My maths in the earlier attempt was off. Working out the exponents according to the letter index...
    //       A x 10^(top.length-1), Bx10^(top.length-2), Cx10^(top.length-3)
    //index  0                      1                    2
    // looking at the '-x' within the exponent, x is always index+1
    // i.e. A x 10^(top.length-(index+1))

    //now we need to go through all the potential digit combinations, so long as topSum*bottomSum !== answer
    topSum = 0;
    bottomSum = 0;
    answerNum = parseInt(answer);

    //iterate over top to calculate topSum:
    for (i = 0; i < top.length; i++) {
        //work out the digit associated with top[i];
        let letterIndex = array.indexOf(top[i])
        let digit = parseInt(array[letterIndex+1])
        topSum += digit*Math.pow(10,(top.length-(i+1)))
    }
    //iterate over bottom to calculate bottomSum:
    for (i = 0; i < bottom.length; i++) {
        //work out the digit associated with top[i];
        let letterIndex = array.indexOf(bottom[i])
        let digit = parseInt(array[letterIndex+1])
        bottomSum += digit*Math.pow(10,(bottom.length-(i+1)))
    }
    console.log("topSum: "+topSum);
    console.log("bottomSum: "+bottomSum)

while (topSum*bottomSum!==parseInt(answer)) {//begin of while loop 
//in the while loop, we need to increment the last value in the list until it hits 9
//then it has to increment the next-to-last by one, resetting itself to the lowest unused digit
// start by creating a list of digits that are available to use.
// Do this by iterating over array from i=1 to 9
// if i isn't in array, push it to unused
    let available = [];
    for (let i=1; i<10; i++){
        if (array.indexOf(i)===-1){
            available.push(i);
        }

    //We now have a list of available digits.
    
    ////failed attempt #2, got too convoluted and confusing again
    ////now I will create a function incr(list) which will increment array by one
    ////
    ////A problem with unusedDigits is that if we return a digit to the list, it will be returned as the lowest value again
    ////we can create a list of seen digits and a variable try which is the lowest unused digit
    ////I have therefore created a second list of digits in use. I will have to pass digits to and from these lists and 
    ////they are in use or become available.
    ////I will also create a variable try to track which digits have already been attempted.
    ////I've already tried this once and it became a mess, hopefully the addition of the digitsInUse variable will make things
    ////easier to keep track of.
    //function incr(list){ //start of function incr(list)
    //    for (i=list.length-1; i<-1; i-=2){
    //        let seen=[];
    //        seen.push(list[i]);
    //        let try = Math.min(unusedDigits);
    //        if (seen.indexOf(try)===-1 && unusedDigits.indexOf(try)>-1){    // if try is not in seen and is unused
                                                                            // add list[i] to unused
                                                                            // remove list[i] from in use
                                                                            // change list[i] to try
                                                                            // add list[i] to in use
                                                                            // remove list[i] from unused
    //        }                           

    //    }
    //} //end of function incr(list)




   }//end of while loop
return `${topSum} * ${bottomSum} = ${answer}`
}//end of function

//Tests to access arrays within array
let myArray = [
    ['A', 1],
    ['B', 2],
    ['C', 3]
]
console.log(myArray)                    // shows an array of arrays
console.log(myArray[0])                 // shows ['A',1]
console.log(myArray.indexOf(['A', 1]))   // returns -1, ie it doesn't find ['A',1]
console.log(myArray.hasOwnProperty(myArray.indexOf('A', 1))) //returns false