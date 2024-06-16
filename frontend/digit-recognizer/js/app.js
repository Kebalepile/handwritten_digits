/*
file manages the application flow & initialzies the necessary components.
 app.js
Initializes the application, sets up event listeners, and manages the navigation between different screens.
*/
import { initializeCanvas, clearCanvas } from "./canvas.js";
import { startGame, submitAnswer } from "./game.js";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  initializeCanvas(canvas, ctx);

  let drawing = false;
  let lineWidth = 5;

  canvas.addEventListener("mousedown", () => (drawing = true));
  canvas.addEventListener("mouseup", () => {
    drawing = false;
    ctx.beginPath();
  });
  canvas.addEventListener("mousemove", event =>
    draw(event, canvas, ctx, lineWidth)
  );

  document.getElementById("pencilButton").addEventListener("click", () => {
    lineWidth = 5;
  });

  document.getElementById("ballPenButton").addEventListener("click", () => {
    lineWidth = 10;
  });

  document.getElementById("clearButton").addEventListener("click", () => {
    clearCanvas(canvas, ctx);
    document.getElementById("result").innerText = "";
  });

  document.getElementById("downloadButton").addEventListener("click", () => {
    canvas.toBlob(blob => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "digit.png";
      link.click();
    }, "image/jpeg");
  });

  document
    .getElementById("predictButton")
    .addEventListener("click", submitAnswer);

  document
    .getElementById("startGameButton")
    .addEventListener("click", startGame);
});

function draw(event, canvas, ctx, lineWidth) {
  if (!drawing) return;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = "round";
  ctx.strokeStyle = "black";
  ctx.lineTo(
    event.clientX - canvas.offsetLeft,
    event.clientY - canvas.offsetTop
  );
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(
    event.clientX - canvas.offsetLeft,
    event.clientY - canvas.offsetTop
  );
}
