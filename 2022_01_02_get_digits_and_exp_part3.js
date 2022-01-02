//Now I'm going to try to salvage what works from my earlier attempts with the new incr() and test() funcitons.
//This version works!!!! However, it times out during the random tests. For now, however, let me exult in the 
//glory of having got this algorithm to work, even if it is inefficient! 

function guessExpression(exp) {



    function incr(list) {
      // console.log(`list: ${list}`)
        let letters = [];
        let digits = [];
        for (let i = 0; i < list.length; i++) {
            if (i % 2 === 0) { letters.push(list[i]) };
            if (i % 2 > 0) { digits.push(list[i]) };
        }
      //  console.log(`letters: ${letters} digits: ${digits}`)
        let num = parseInt(digits.join(""));
      //  console.log(`num = ${num}`)
        num += 1
      //  console.log(`num after adding 1: ${num}`)
    
        while (test(num)===false){
            num+=1
        }
        // once it breaks out of this while loop we should have a valid number
        // convert it to a string and split it
        digits = num.toString().split("");
      //  console.log(`digits: ${digits}`)
        // now we have to interlace letters and digits back together
        let newList = [];
        for (let x=0; x<letters.length; x++){
            newList.push(letters[x]);
            newList.push(digits[x]);
        }// console.log(`newList: ${newList}`)
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

    let array = []
    for (let i = 0; i < top.length; i++) {
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

    let topSum = 0;
    let bottomSum = 0;
    let answerNum = parseInt(answer);
 

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
   // console.log(`array before while loop: ${array}`)
    while (topSum*bottomSum!==answerNum){ //start of while loop
        topSum=0;
        bottomSum=0;
   // console.log(`array before incr: ${array}`)  
        array = incr(array);
   // console.log(`array after incr: ${array}`) 
      //recalculate top and bottom:
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
     // console.log(`topSum = ${topSum}, bottomSum =${bottomSum}`)
    }//end of while loop
    
    return `${topSum} * ${bottomSum} = ${answer}`
}//end of function guessExpression(exp)





