var bonkPts = 0;
var secondsLeft = 60;
var tickTockTimer;
var chaosTimer;
var gameIsCraycray = false;
var chaosSpeed = 1200;

var moleHoles = document.getElementsByClassName("hole");
var bonkDisplay = document.getElementById("score");
var timerDisplay = document.getElementById("time");
var bonkButton = document.getElementById("startBtn");

var bonkStick = document.createElement("img");
bonkStick.src = "hammer.png";
bonkStick.id = "hammer";
document.body.appendChild(bonkStick);

document.addEventListener("mousemove", function(event) {
  bonkStick.style.left = (event.clientX - bonkStick.width / 2) + "px";
  bonkStick.style.top = (event.clientY - bonkStick.height / 2) + "px";
});

document.addEventListener("mousedown", function() {
  bonkStick.className = "hit";
});

document.addEventListener("mouseup", function() {
  bonkStick.className = "";
});

bonkButton.addEventListener("click", function() {
  startTheChaos();
});

function chaosMaker() {
  clearTheArena();

  var randomHoleIndex = Math.floor(Math.random() * moleHoles.length);
  var chosenHole = moleHoles[randomHoleIndex];

  var chaosChance = Math.random();
  var chaosObject = document.createElement("img");

  if (chaosChance < 0.8) {
    chaosObject.src = "mole.png";
    chaosObject.className = "mole";
  } else {
    chaosObject.src = "bomb.png";
    chaosObject.className = "bomb";
  }

  chaosObject.addEventListener("click", function(event) {
    event.stopPropagation();
    bonkIt(chaosObject);
  });

  chosenHole.appendChild(chaosObject);

  setTimeout(function() {
    chaosObject.className += " show";
  }, 10);

  if (bonkPts >= 55 && chaosSpeed > 600) {
    chaosSpeed -= 100;
    clearInterval(chaosTimer);
    chaosTimer = setInterval(chaosMaker, chaosSpeed);
  }
}

function bonkIt(target) {
  if (!gameIsCraycray) {
    return;
  }

  if (target.className.indexOf("mole") >= 0) {
    bonkPts += 15;
  } else if (target.className.indexOf("bomb") >= 0) {
    bonkPts -= 25;
  }

  bonkDisplay.innerHTML = bonkPts;

  target.parentNode.removeChild(target);
}

function tickTock() {
  secondsLeft -= 1;
  timerDisplay.innerHTML = secondsLeft;

  if (secondsLeft <= 0) {
    endTheChaos();
  }
}

function startTheChaos() {
  clearTheArena();
  bonkPts = 0;
  secondsLeft = 60;
  chaosSpeed = 1200;
  gameIsCraycray = true;

  bonkDisplay.innerHTML = bonkPts;
  timerDisplay.innerHTML = secondsLeft;

  clearInterval(tickTockTimer);
  clearInterval(chaosTimer);

  tickTockTimer = setInterval(tickTock, 1000);
  chaosTimer = setInterval(chaosMaker, chaosSpeed);
}

function endTheChaos() {
  clearInterval(tickTockTimer);
  clearInterval(chaosTimer);
  gameIsCraycray = false;
  clearTheArena();
  alert("Time's up! Final Bonk Points: " + bonkPts);
}

function clearTheArena() {
  for (var i = 0; i < moleHoles.length; i++) {
    var singleHole = moleHoles[i];
    while (singleHole.firstChild) {
      singleHole.removeChild(singleHole.firstChild);
    }
  }
}