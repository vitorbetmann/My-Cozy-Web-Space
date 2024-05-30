const { randomInt } = require("crypto");
const { type } = require("os");

//--------------------------GAME--------------------------
function play(id) {
  var oppObj, randomElement;

  var myObj = document.getElementById(id);
  var idArray = ["00", "01", "02", "10", "11", "12", "20", "21", "22"];

  if (myObj.textContent === "") {
    myObj.innerHTML = "X";

    if (gameOver()) {
      alert("You Win!");
      resetGame();
    } else if (isTie()) {
      alert("It's a Tie!");
      resetGame();
    } else {
      do {
        randomElement = idArray[Math.floor(Math.random() * idArray.length)];
        oppObj = document.getElementById(randomElement);
      } while (oppObj.textContent != "");

      oppObj.innerHTML = "O";

      if (gameOver()) {
        alert("You Lose!");
        resetGame();
      }
    }
  } else {
    alert("Not Valid Play!");
  }
}
function isTie() {
  var idArray = ["00", "01", "02", "10", "11", "12", "20", "21", "22"];

  for (var i = 0; i < idArray.length; i++) {
    var obj = document.getElementById(idArray[i]);
    if (obj.textContent === "") {
      return false;
    }
  }
  return true;
}
function gameOver() {
  var topL = document.getElementById("00").textContent;
  var topM = document.getElementById("01").textContent;
  var topR = document.getElementById("02").textContent;

  var midL = document.getElementById("10").textContent;
  var midM = document.getElementById("11").textContent;
  var midR = document.getElementById("12").textContent;

  var botL = document.getElementById("20").textContent;
  var botM = document.getElementById("21").textContent;
  var botR = document.getElementById("22").textContent;

  var topRow = topL != "" && topL === topM && topM === topR;
  var midRow = midL != "" && midL === midM && midM === midR;
  var botRow = botL != "" && botL === botM && botM === botR;

  var leftCol = topL != "" && topL === midL && midL === botL;
  var midCol = topM != "" && topM === midM && midM === botM;
  var rightCol = topR != "" && topR === midR && midR === botR;

  var diagTopL = topL != "" && topL === midM && midM === botR;
  var diagTopR = topR != "" && topR === midM && midM === botL;

  if (
    topRow ||
    midRow ||
    botRow ||
    leftCol ||
    midCol ||
    rightCol ||
    diagTopL ||
    diagTopR
  ) {
    return true;
  }
  return false;
}
function resetGame() {
  var idArray = ["00", "01", "02", "10", "11", "12", "20", "21", "22"];

  for (var i = 0; i < 9; i++) {
    document.getElementById(idArray[i]).innerHTML = "";
  }
}
function playMusic() {
  var x = document.getElementById("player");
  if (x.style.display === "none") {
    x.style.display = "block";
    document.getElementById("onOFF").innerHTML = "Show";
  } else {
    x.style.display = "none";
    document.getElementById("onOFF").innerHTML = "Hide";
  }
}

//--------------------------JOURNAL--------------------------
function saveFile() {
  var values = {};
  var name = document.getElementById("fileName").value;
  if (name.length < 1) {
    name = "myJournal";
  }

  name = name + ".txt";

  //get the data in the form on the front end
  var x = document.getElementById("text").value;
  values["text"] = x;
  values["fileName"] = name;

  //pass this information to the back end, and receive a response.
  $.getJSON("http://localhost:8000/write", values, function (data) {
    alert(data.output);
  });
}

function remove() {
  document.getElementById("text").innerHTML = " ";
}
function align() {
  var whatitsays = document.getElementById("align").innerHTML;
  if (whatitsays === "left") {
    document.getElementById("align").innerHTML = "middle";
    document.getElementById("text").style.textAlign = "center";
  } else if (whatitsays === "middle") {
    document.getElementById("align").innerHTML = "right";
    document.getElementById("text").style.textAlign = "right";
  } else {
    document.getElementById("align").innerHTML = "left";
    document.getElementById("text").style.textAlign = "left";
  }
}
function fontStyle() {
  var whatitsays = document.getElementById("ftst").innerHTML;
  if (whatitsays === "plain") {
    document.getElementById("ftst").innerHTML = "italic";
    document.getElementById("text").style.fontStyle = "italic";
  } else if (whatitsays === "italic") {
    document.getElementById("ftst").innerHTML = "oblique";
    document.getElementById("text").style.fontStyle = "oblique";
  } else if (whatitsays === "oblique") {
    document.getElementById("ftst").innerHTML = "scream in tiny";
    document.getElementById("text").style.fontVariant = "small-caps";
  } else {
    document.getElementById("ftst").innerHTML = "plain";
    document.getElementById("text").style.fontVariant = "normal";
    document.getElementById("text").style.fontStyle = "normal";
  }
}
function plus() {
  document.getElementById("text").style.fontSize = "larger";
}
function minus() {
  document.getElementById("text").style.fontSize = "smaller";
}

//--------------------------HOME PAGE--------------------------
function clock() {
  var x = document.getElementById("clockyclock");
  if (x.style.display === "none") {
    x.style.display = "block";
    document.getElementById("clockBUTT").innerHTML = "ON";
  } else {
    x.style.display = "none";
    document.getElementById("clockBUTT").innerHTML = "OFF";
  }

  var d = new Date();
  var hour = d.getHours();
  var min = d.getMinutes();
  if (d.getMinutes() < 10) {
    min = "0" + min;
  }

  document.getElementById("timeT").innerHTML = hour + ":" + min;
}
function gif() {
  var y = document.getElementById("catIMG");
  if (y.style.display === "none") {
    y.style.display = "block";
    document.getElementById("cat").innerHTML = "Show";
  } else {
    y.style.display = "none";
    document.getElementById("cat").innerHTML = "Hide";
  }
}
