function CreateRandomShape() {
  const shape = document.createElement("div");
  shape.classList.add("shape");

  // Random position within safe boundaries
  const safeWidth = window.innerWidth - 100; // Adjust as needed
  const safeHeight = window.innerHeight - 100; // Adjust as needed
  const x = Math.random() * safeWidth;
  const y = Math.random() * safeHeight;
  shape.style.left = `${x}px`;
  shape.style.top = `${y}px`;

  // Random shape and animation
  const shapes = ["swirl", "spiral", "zigzag"];
  const shapeType = shapes[Math.floor(Math.random() * shapes.length)];

  if (shapeType === "swirl") {
    shape.innerText = "~";
    shape.style.animationName = "swirl, fadeOut";
  } else if (shapeType === "spiral") {
    shape.innerText = "O";
    shape.style.animationName = "spiral, fadeOut";
  } else if (shapeType === "zigzag") {
    shape.innerText = "Z";
    shape.style.animationName = "zigzag, fadeOut";
  }

  // Remove the shape after the animation ends
  shape.addEventListener("animationend", () => {
    shape.parentNode.removeChild(shape);
  });

  const root = document.getElementById("root");
  root.appendChild(shape);
}


export default CreateRandomShape;
