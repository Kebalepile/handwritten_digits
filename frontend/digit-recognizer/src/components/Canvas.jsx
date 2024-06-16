import React, { useRef, useEffect, useState } from 'react';
import { initializeCanvas, clearCanvas, drawOnCanvas } from '../utils/canvas';

const Canvas = ({ clearTrigger, onClearComplete }) => {
  const canvasRef = useRef(null);
  const [lineWidth, setLineWidth] = useState(10);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    initializeCanvas(canvas, ctx);

    let drawing = false;

    const handleMouseDown = () => {
      drawing = true;
    };

    const handleMouseUp = () => {
      drawing = false;
      ctx.beginPath();
    };

    const handleMouseMove = (event) => {
      if (!drawing) return;
      drawOnCanvas(event, canvas, ctx, lineWidth);
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [lineWidth]);

  useEffect(() => {
    if (clearTrigger) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      clearCanvas(canvas, ctx);
      if (onClearComplete) onClearComplete();
    }
  }, [clearTrigger, onClearComplete]);

  const handleClear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    clearCanvas(canvas, ctx);
  };

  return (
    <div className="canvas-container">
      <canvas
        id="canvas"
        ref={canvasRef}
        width="280"
        height="280"
        style={{ border: '1px solid black' }}
      ></canvas>
      <div className="button-group">
        {/* <button onClick={() => setLineWidth(5)}>Pencil</button> */}
        <button onClick={() => setLineWidth(10)}>Ball Pen</button>
        <button onClick={handleClear}>Clear</button>
      </div>
    </div>
  );
};

export default Canvas;
