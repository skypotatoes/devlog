// I am moving over to a new file because things were getting too crowded on the original. I am taking what I have so far and stripping out comments:
function guessExpression(exp) {
    console.log("START"+exp)
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
    let mult =0;


let seen =[];
  console.log(typeof answerNum)
while (mult!==answerNum) {//begin of while loop 
//in the while loop, we need to increment the last value in the list until it hits 9
//then it has to increment the next-to-last by one, and so on. Track available digits with
//the variable 'available':
        topSum=0;
        bottomSum=0;  
  
    let available = [];
    for (let q=1; q<10; q++){
        if (array.indexOf(q)===-1){
            available.push(q);
        }
    }

    
    console.log("available"+available)
    console.log(seen)
    //We now have a list of available digits.
    function incr(list){
      console.log("incr(list) begins")
        for (let i = list.length-1; i>-1; i-=2){
                if (available.length>1){
                    for (let j=i; j<list.length; j+=2){
                      for (item in seen){
                        if (available.indexOf(seen[item])>-1){
                          available.splice(available.indexOf(seen[item]),1);
                        }
                      }
                     list[i] = Math.min(...available);
                     seen.push(list[i]);
                     console.log("seen: "+seen)
                     available.splice(available.indexOf(Math.min(available),1))
                    }
                    i=-1;
                } else { //reset available numbers
                    for (let i=1; i<10; i++){
                        if (array.indexOf(i)===-1){
                            available.push(i);
                        }
                    }
                } //avail now reset

        } return array;
    }// end of incr(list)
  
      //iterate over top to calculate topSum:
    for (i = 0; i < top.length; i++) {
        //work out the digit associated with top[i];
        let letterIndex = array.indexOf(top[i])
        let digit = parseInt(array[letterIndex+1])
        topSum += digit*Math.pow(10,(top.length-(i+1)))
    } console.log("topSum = "+topSum)
    
    //iterate over bottom to calculate bottomSum:
    for (i = 0; i < bottom.length; i++) {
        //work out the digit associated with top[i];
        let letterIndex = array.indexOf(bottom[i])
        let digit = parseInt(array[letterIndex+1])
        bottomSum += digit*Math.pow(10,(bottom.length-(i+1)))
    } console.log("bottomSum = "+bottomSum)
  
    console.log(array)
    console.log("topSum * bottomSum: "+(topSum*bottomSum))
    
  
    console.log("seen: "+seen)
    console.log("array before incr(array")
    console.log(array)
  
    //reset topSum and bottomSum to zero

    array = incr(array);
    console.log("array after incr(array)")
    console.log(array)
    mult = topSum*bottomSum;
   }//end of while loop
return `${topSum} * ${bottomSum} = ${answer}`
}//end of function


// i am leaving this here for the night. 

// no I'm not, lol
// I think I will come back to this another night. Below is where I am right now. I think I need to reset variable 'seen' to empty
// somewhere, but I also think there are other problems in the code.
// I will continue to have a think about how this might be implemented. I am getting lost in for loops within for loops within while loops.
// It works for some of the early tests but fails once it reaches a 9 in the last index of array. I am inclined to start this again from
//scratch rather than continue to try and make this spaghetti code work.

function guessExpression(exp) {
    console.log("START"+exp)
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
    let mult =0;


let seen =[];
  console.log(typeof answerNum)
while (mult!==answerNum) {//begin of while loop 
//in the while loop, we need to increment the last value in the list until it hits 9
//then it has to increment the next-to-last by one, and so on. Track available digits with
//the variable 'available':
        topSum=0;
        bottomSum=0;  
  
    let available = [];
    for (let q=1; q<10; q++){
        if (array.indexOf(q)===-1){
            available.push(q);
        }
    }

    
    console.log("available"+available)
    console.log(seen)
    //We now have a list of available digits.
    function incr(list){
      console.log("incr(list) begins")
        for (let i = list.length-1; i>-1; i-=2){
                if (available.length>1){
                    for (let j=i; j<list.length; j+=2){
                      for (item in seen){
                        if (available.indexOf(seen[item])>-1){
                          available.splice(available.indexOf(seen[item]),1);
                        }
                      }
                     list[i] = Math.min(...available);
                     seen.push(list[i]);
                     console.log("seen: "+seen)
                     available.splice(available.indexOf(Math.min(available),1))
                    }
                  
                    i=-1;
                  
                } else { //reset available numbers
                    for (let i=1; i<10; i++){
                        if (array.indexOf(i)===-1){
                            available.push(i);
                        }
                    }
                } //avail now reset
if (seen.indexOf(9)>-1){seen=[]; console.log("seen RESETTING HERE")}
        } return array;
    }// end of incr(list)
  
      //iterate over top to calculate topSum:
    for (i = 0; i < top.length; i++) {
        //work out the digit associated with top[i];
        let letterIndex = array.indexOf(top[i])
        let digit = parseInt(array[letterIndex+1])
        topSum += digit*Math.pow(10,(top.length-(i+1)))
    } console.log("topSum = "+topSum)
    
    //iterate over bottom to calculate bottomSum:
    for (i = 0; i < bottom.length; i++) {
        //work out the digit associated with top[i];
        let letterIndex = array.indexOf(bottom[i])
        let digit = parseInt(array[letterIndex+1])
        bottomSum += digit*Math.pow(10,(bottom.length-(i+1)))
    } console.log("bottomSum = "+bottomSum)
  
    console.log(array)
    console.log("topSum * bottomSum: "+(topSum*bottomSum))
    
  
    console.log("seen: "+seen)
    console.log("array before incr(array")
    console.log(array)
  
    //reset topSum and bottomSum to zero

    array = incr(array);
    console.log("array after incr(array)")
    console.log(array)
    mult = topSum*bottomSum;
   }//end of while loop
console.log(`${topSum} * ${bottomSum} = ${answer}`)
  console.log("END")
return `${topSum} * ${bottomSum} = ${answer}`
}//end of function