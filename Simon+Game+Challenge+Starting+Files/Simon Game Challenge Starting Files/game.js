var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer();
});

function checkAnswer() {
  if (
    userClickedPattern[userClickedPattern.length - 1] !==
    gamePattern[userClickedPattern.length - 1]
  ) {
    startOver();
    return;
  }
  if (userClickedPattern.length === gamePattern.length) {
    userClickedPattern = [];
    setTimeout(function () {
      nextSequence();
    }, 1000);
  }
}

function startOver() {
  level = 0;
  userClickedPattern = [];
  gamePattern = [];
  $("#level-title").text("Game Over, Press Any Key To Restart");
  $("body").toggleClass("game-over");
  setTimeout(function () {
    $("body").toggleClass("game-over");
  }, 200);
}

// Game start on keypress
$("body").on("keydown", function () {
  if (level === 0) {
    nextSequence();
  }
});

// for (colour of buttonColours) {
// //https://dzone.com/articles/why-does-javascript-loop-only-use-last-value
//   (function (col) {
//     $("#" + col).click(function () {
//       onClick(col);
//     });
//   })(colour);
// }
// function onClick(colour) {
//     var userChosenColour = colour;
//     userClickedPattern.push(userChosenColour);
//     $("#" + colour)
//       .fadeOut(100)
//       .fadeIn(100);
//     var audio = new Audio("./sounds/" + colour + ".mp3");
//     audio.play();
//     console.log(userClickedPattern);
//   }
