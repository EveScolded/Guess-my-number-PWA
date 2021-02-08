import "../scss/main.scss";

// uncomment the lines below to enable PWA
import { registerSW } from "./pwa.js";
registerSW();

("use strict");

let secretNumber = Math.trunc(Math.random() * 20) + 1;

let number = document.querySelector(".number").textContent;

let score = 20;

// functions

const displayMessage = function (message) {
  document.querySelector(".message").textContent = message;
};

const displayStyle = function (
  widthValue,
  heightValue,
  textValue,
  paddingValue
) {
  document.querySelector(".number").style.width = widthValue;
  document.querySelector(".number").style.height = heightValue;
  document.querySelector(".number").textContent = textValue;
  document.querySelector(".number").style.padding = paddingValue;
};

const displayScore = function (value) {
  document.querySelector(".score").textContent = value;
};

const displayBackground = function (color) {
  document.querySelector("body").style.backgroundColor = color;
};

// check button

const checkingNumber = function () {
  const guess = Number(document.querySelector(".guess").value);

  if (score === 1) {
    displayMessage("You lost!");
    displayScore("0");
    displayStyle("300px", "36rem", "You lost!", "16rem");
    displayBackground("rgb(165, 17, 17)");
  } else {
    if (!guess) {
      displayMessage("There is no number!");
    } else if (guess > secretNumber) {
      ("Too high! Secret number is between 1 and 20");
      displayMessage(
        guess > 20 ? "Too high! Choose number between 1 and 20" : "Too high!"
      );
      score = score - 1;
      displayScore(score);
    } else if (guess < secretNumber) {
      displayMessage(
        guess < 0 ? "Too low! Choose number between 1 and 20" : "Too low!"
      );
      score = score - 1;
      displayScore(score);
    } else if (guess === secretNumber) {
      displayMessage("Correct number!");
      displayStyle("20rem", "10rem", secretNumber, "2rem");
      displayBackground("#60b347");

      let highScore = Number(document.querySelector(".highscore").textContent);
      if (highScore < score) {
        document.querySelector(".highscore").textContent = score;
      }
    }
  }
};

document.querySelector(".check").addEventListener("click", checkingNumber);
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    checkingNumber();
  }
});

// again button

document.querySelector(".again").addEventListener("click", () => {
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;
  displayMessage("Start guessing...");
  displayScore(score);
  document.querySelector(".guess").value = "";
  displayStyle("15rem", "12rem", "?", "3rem");
  displayBackground("#222");
});
