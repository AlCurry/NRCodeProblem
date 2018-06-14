// Bowling Score coding exercise for Next Rev Technologies
// javascript file that calculates the bowling score

//Al Curry - June 13 2018  

// "main" function that accepts the bowling score string for one game as a parameter
// and returns the calculated score for that game
// for example :
// "45-54-36-27-09-63-81-18-90-72" is an input score string
// 90 is the calculated score returned
// Exercise description provides additional examples.
function bowlingScore(scoreStr) {

  scoreArray = scoreStr.split("-");

  console.log(scoreArray);
  var score = 0;

  // frameType 0, 1, 2 - open, spare, or strike
  // default setting is open - i.e. 2 digits, 0-9
  var frameType = 0;
  var frame = 1;

  // iterate through each character in the score string
  for (var frameIdx in scoreArray) {
    //console.log(scoreArray[frameIdx]);

    // determine "frameType"     3 -- 2 strike bonus
    //   2 - strike   1 - spare   0 - open 
    if (scoreArray[frameIdx] === "XX") {
      frameType = 3;
    } else if (scoreArray[frameIdx] === "X") {
      frameType = 2;
    } else if (scoreArray[frameIdx].indexOf("/") > 0) {
      frameType = 1;
    } else {
      frameType = 0;
    }

    //console.log("frameType: " + frameType);
    //console.log("score: " + score);

    switch (frameType) {
      // 2 strike bonus - special case
      case 3:
        score += 30;
        break;

      // strike
      case 2:
        score += 10;
        score = addNextTwo(frame, score);
        break;

      // spare
      case 1:
        score += 10;
        score = addNextOne(frame, score);
        break;

      // "open" frame, not a strike or a spare
      case 0:
        var frameScore = 0;
        if (scoreArray[frameIdx].length === 2) {
          frameScore =
            parseInt(scoreArray[frameIdx][0]) +
            parseInt(scoreArray[frameIdx][1]);
        }

        score += frameScore;
        break;
      default:
    }
    frame++;
  }

  return score;
}


// "addNextTwo" function called when there is a strike - to "look ahead"
// in the string and add the next numbers of pins for the next two throws
function addNextTwo(frame, currentScore) {
  console.log(scoreArray[frame]);
  if (scoreArray[frame] === "X") {
    currentScore += 10;
    var nextFrame = frame + 1;
    if (scoreArray[nextFrame] === "X") {
      currentScore += 10;
    }
  }
  console.log(scoreArray[frame].length);
  if (scoreArray[frame].length === 2 && scoreArray[frame] !== "XX") {
    if (scoreArray[frame][1] === "/") {
      currentScore += 10;
    } else {
      currentScore +=
        parseInt(scoreArray[frame][0]) + parseInt(scoreArray[frame][1]);
    }
  }

  return currentScore;
}

// "addNextOne" function called when there is a spare - to "look ahead"
// in the string and add the next value 
function addNextOne(frame, currentScore) {
  var nextFrame = frame + 1;
  if (nextFrame === 11) nextFrame--;
  currentScore += parseInt(scoreArray[nextFrame][0]);

  return currentScore;
}

function getScore() {
  var bScoreString = document.getElementById("bowlScores").value;
  var gameScore = 0;
  if (bScoreString !== "") {
    gameScore = bowlingScore(bScoreString);
  }
  document.getElementById("bowlscore").innerHTML = gameScore;
}

function clearScore() {
  document.getElementById("bowlScores").value = "";
}

/*  Bowling Score strings used in testing - commented out for now 

scoreStr = "X-X-X-X-X-X-X-X-X-X-XX";  // result 300
bowlingScore(scoreStr);

scoreStr = "5/-5/-5/-5/-5/-5/-5/-5/-5/-5/-5";  // result 150
bowlingScore(scoreStr);

scoreStr = "45-54-36-27-09-63-81-18-90-72";  // result 90
bowlingScore(scoreStr);

scoreStr = "45-54-36-27-09-63-81-18-90-7/-5";  // result 96
bowlingScore(scoreStr);

scoreStr = "X-12-34-34-34-34-34-34-34-34";  // result 72 
bowlingScore(scoreStr);

scoreStr = "X-5/-34-34-34-34-34-34-34-34";  // result  89 
bowlingScore(scoreStr);

*/
