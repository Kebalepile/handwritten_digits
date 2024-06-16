import React from 'react';
import Canvas from './Canvas';

const Game = ({ onBackToHome }) => {
  const handlePredict = () => {
    const canvas = document.getElementById('canvas');
    const imgData = canvas.toDataURL('image/png');
    const img = new Image();
    img.src = imgData;
    img.onload = () => {
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
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
      formData.append('input', JSON.stringify(input));

      fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Predicted digit: ' + data.digit)
          document.getElementById('result').innerText = 'Predicted digit: ' + data.digit;
        })
        .catch((error) => console.error('Error:', error));
    };
  };

  const handleDownload = () => {
    const canvas = document.getElementById('canvas');
    canvas.toBlob((blob) => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'digit.png';
      link.click();
    }, 'image/jpeg');
  };

  return (
    <div className="container">
      <h2 id="problem">Problem: 5 - 3 = ?</h2>
      <Canvas />
      <div className="button-group">
        <button onClick={handleDownload}>Download</button>
        <button onClick={handlePredict}>Predict</button>
      </div>
      <div id="result"></div>
      <button onClick={onBackToHome}>Back to Home</button>
    </div>
  );
};

export default Game;
