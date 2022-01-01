// 01/01/22
//
//I solved this Kata yesterday. 
// https://www.codewars.com/kata/56882731514ec3ec3d000009
//Was very pleased with myself until I ran it on the full test suite and it was failing some tests.
//Looking into it, I discovered that I had forgotten that when a token is placed, it isn't necessarily at the end of the line of
//four. Fixing it only took a small addition, which was after every token to check every single position for a win state. I didn't
//like this solution, as it meant iterating over every position on the board each turn, but it fixed it well enough that it passed
//the tests.
//You can see my fix on the line commented "horrible quick n dirty hack to check all places on the board every turn".

function whoIsWinner(piecesPositionList){
    //create an array for each column
    let moves = piecesPositionList;
    let a = [" "," "," "," "," "," "];
    let b = [" "," "," "," "," "," "];
    let c = [" "," "," "," "," "," "];
    let d = [" "," "," "," "," "," "];
    let e = [" "," "," "," "," "," "];
    let f = [" "," "," "," "," "," "];
    let g = [" "," "," "," "," "," "];
    let board = [a,b,c,d,e,f,g]
    //add R or Y to an array each for each move given
    //each time a piece is added, run a check for 4 in a row
    //only need to run the check on the last space that was occupied
    //but for that we need the last index of the row we just added to
    
    for (let entry in moves){
      let col=moves[entry][0];
      let token=moves[entry].slice(2);
      let letter=moves[entry][2]
      if (col=== "A"){var i=a.indexOf(" "); a[a.indexOf(" ")]=letter; var x=0;};
      if (col=== "B"){var i=b.indexOf(" "); b[b.indexOf(" ")]=letter; var x=1;};
      if (col=== "C"){var i=c.indexOf(" "); c[c.indexOf(" ")]=letter; var x=2;};
      if (col=== "D"){var i=d.indexOf(" "); d[d.indexOf(" ")]=letter; var x=3;};
      if (col=== "E"){var i=e.indexOf(" "); e[e.indexOf(" ")]=letter; var x=4;};
      if (col=== "F"){var i=f.indexOf(" "); f[f.indexOf(" ")]=letter; var x=5;};
      if (col=== "G"){var i=g.indexOf(" "); g[g.indexOf(" ")]=letter; var x=6;};
      console.log("board")
      console.log(board);
      if (entry > 6){
        // 8 checks to run
        
        for (let p=0;p<7;p++){     //horrible quick n dirty hack to check all places on the board every turn
          for (let q=0;q<6;q++){
            x=p; i=q;
       
        
        
        // 1. Left
        if (x>2&&board[x][i]===letter&&board[x-1][i]===letter&&board[x-2][i]===letter&&board[x-3][i]===letter){
          return token;
        }
        // 2. Right
        if (x<4&&board[x][i]===letter&&board[x+1][i]===letter&&board[x+2][i]===letter&&board[x+3][i]===letter){
          return token;
        }
        // 3. Up
        //no point checking up, duh! they will always be empty
        // 4. Down
        if (i>2&&board[x][i]===letter&&board[x][i-1]===letter&&board[x][i-2]===letter&&board[x][i-3]===letter){
          return token;
        }
        // 5. Left-up
        if(x>2&&i<3&&board[x][i]===letter&&board[x-1][i+1]===letter&&board[x-2][i+2]===letter&&board[x-3][i+3]===letter){
          return token;
        }
        // 6. Left-down
        if(x>2&&i>2&&board[x][i]===letter&&board[x-1][i-1]===letter&&board[x-2][i-2]===letter&&board[x-3][i-3]===letter){
          return token;
        }
        // 7. Right-up
        if(i<3&&x<4&&board[x][i]===letter&&board[x+1][i+1]===letter&&board[x+2][i+2]===letter&&board[x+3][i+3]===letter){
          return token;
        }
        // 8. Right-down
        if(x<4&&i>2&&board[x][i]===letter&&board[x+1][i-1]===letter&&board[x+2][i-2]===letter&&board[x+3][i-3]===letter){
          return token;
        }
  
      }
    }   }
        }
    return "Draw"
    //return "Red", "Yellow" or "Draw"
  }