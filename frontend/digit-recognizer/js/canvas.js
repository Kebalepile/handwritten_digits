/*
provides utility fucntions for canvas operations

canvas.js
Handles the canvas drawing functionalities.*/

export function initializeCanvas(canvas, ctx) {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

export function clearCanvas(canvas, ctx) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  initializeCanvas(canvas, ctx);
  ctx.beginPath();
}
