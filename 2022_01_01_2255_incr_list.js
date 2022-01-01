// Still thinking about the kata "Guess the Digits and Expression" found here:
// https://www.codewars.com/kata/57f9bbe759eb61a049000160
//
//Where I am getting stuck in creating a function to take a list of the form
// list - ['A',1,'B',2,'C',3]
//and increment it by 1. I seem to have succeeded only in incrementing the last digit by 1!
//I thought if I look at this task in isolation it may be easier than trying to complete the whole kata all in one go.
//
//The immediate thing that springs to mind is I could turn the list from ['A',1,'B',2,'C',3] into just the number 123 and add 1.
//I would have to run checks to make sure there is no 0 in the result, and that no digits repeat. That shouldn't be too hard.
//So long as the number passed those tests, it could then be split up and formed into the same format as the original list.
//
//Letter are stored in the even indices, digits in the odd.
function incr(list) {
    let letters = [];
    let digits = [];
    for (let i = 0; i < list.length; i++) {
        if (i % 2 === 0) { letters.push(list[i]) };
        if (i % 2 > 0) { digits.push(list[i]) };
    }

    num = parseInt(digits.join(""));
    num += 1

    while (test(num)===false){
        num+=1
    }
    // once it breaks out of this while loop we should have a valid number
    // convert it to a string and split it
    digits = num.toString().split("");
    // now we have to interlace letters and digits back together
    newList = [];
    for (let x=0; x<letters.length; x++){
        newList.push(letters[x]);
        newList.push(digits[x]);
    }
    return newList;
}


function test(number) {      //this function will change the new number to a string, checking there are no 0's and no repeating digits
                            //returning false if any of these conditions exist, otherwise true
    str = number.toString();
    splitStr = str.split("");
    if (splitStr.indexOf('0') > -1) { return false };                   //first check for 0's

    for (let j = 0; j < splitStr.length; j++) {
        let slice = splitStr.slice(j + 1);
        if (slice.indexOf(splitStr[j]) > -1) { return false };

    }
    return true;
}

list1 = ['A',1,'B',2,'C',3,'D',4]
console.log(incr(list1))

//seems to be working, so I will try some edge cases.

list2 =['A',1,'B',2,'E',8,'F',9]
list3 =['C',3,'G',2,'M',1,'N',9]

console.log(incr(list2));
console.log(incr(list3))

//This all seems to be working. Now I just need to implement this in the solution for the kata. 