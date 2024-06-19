export function initializeCanvas(canvas, ctx) {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

export function clearCanvas(canvas, ctx) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  initializeCanvas(canvas, ctx);
}

export function drawOnCanvas(prevPos, currentPos, ctx, lineWidth) {
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';
  ctx.strokeStyle = 'black';
  ctx.beginPath();
  ctx.moveTo(prevPos.x, prevPos.y);
  ctx.lineTo(currentPos.x, currentPos.y);
  ctx.stroke();
}