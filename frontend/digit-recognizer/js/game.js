/*
file handles the game logic

game.js
Handles the game logic including problem generation and answer checking.
*/
import { clearCanvas } from "./canvas.js";

export function startGame() {
  document.getElementById("welcome-screen").classList.add("hidden");
  document.getElementById("game-screen").classList.remove("hidden");
  generateProblem();
}

function generateProblem() {
  let num1 = Math.floor(Math.random() * 10);
  let num2 = Math.floor(Math.random() * 10);
  let problem = `${num1} - ${num2} = ?`;
  let correctAnswer = num1 - num2;
  document.getElementById("problem").innerText = problem;
  document.getElementById("problem").dataset.answer = correctAnswer;
  clearCanvas(
    document.getElementById("canvas"),
    document.getElementById("canvas").getContext("2d")
  );
  document.getElementById("feedback").innerText = "";
}

export async function submitAnswer() {
  let canvas = document.getElementById("canvas");
  let imgData = canvas.toDataURL("image/png");
  let img = new Image();
  img.src = imgData;
  img.onload = async () => {
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");
    tempCanvas.width = 28;
    tempCanvas.height = 28;
    tempCtx.drawImage(img, 0, 0, 28, 28);

    const imageData = tempCtx.getImageData(0, 0, 28, 28);
    const data = imageData.data;

    const input = [];
    for (let i = 0; i < data.length; i += 4) {
      const grayscale = (data[i] + data[i + 1] + data[i + 2]) / 3;
      input.push(255 - grayscale); // Invert colors
    }

    const formData = new FormData();
    formData.append("input", JSON.stringify(input));

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData
      });
      const result = await response.json();
      checkAnswer(result.digit);
    } catch (error) {
      console.error("Error:", error);
    }
  };
}

function checkAnswer(predictedDigit) {
  let correctAnswer = document.getElementById("problem").dataset.answer;
  if (predictedDigit == correctAnswer) {
    document.getElementById("feedback").innerText = "Great job!";
    generateProblem();
  } else {
    document.getElementById("feedback").innerText = "Try again!";
  }
}
