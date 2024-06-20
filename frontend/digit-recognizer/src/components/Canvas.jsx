import React, { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { initializeCanvas, clearCanvas, drawOnCanvas } from '../utils/canvas'
import { AiOutlineClear } from 'react-icons/ai'

const Canvas = ({ clearTrigger, onClearComplete, handlePredict }) => {
  const canvasRef = useRef(null)
  const [lineWidth] = useState(10)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const resizeCanvas = () => {
      canvas.width = 300 // Set canvas width
      canvas.height = 300 // Set canvas height
      initializeCanvas(canvas, ctx)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    let drawing = false
    let lastPos = { x: 0, y: 0 }

    const getEventPos = event => {
      const rect = canvas.getBoundingClientRect()
      const touch = event.touches ? event.touches[0] : event
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      }
    }

    const startDrawing = event => {
      drawing = true
      lastPos = getEventPos(event)
      ctx.beginPath()
      ctx.moveTo(lastPos.x, lastPos.y)
      event.preventDefault()
    }

    const stopDrawing = () => {
      drawing = false
      ctx.beginPath()
    }

    const draw = event => {
      if (!drawing) return
      event.preventDefault()
      const pos = getEventPos(event)
      drawOnCanvas(lastPos, pos, ctx, lineWidth)
      lastPos = pos
    }

    // Event listeners for both mouse and touch events
    canvas.addEventListener('mousedown', startDrawing)
    canvas.addEventListener('mouseup', stopDrawing)
    canvas.addEventListener('mousemove', draw)

    canvas.addEventListener('touchstart', startDrawing)
    canvas.addEventListener('touchend', stopDrawing)
    canvas.addEventListener('touchmove', draw)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      canvas.removeEventListener('mousedown', startDrawing)
      canvas.removeEventListener('mouseup', stopDrawing)
      canvas.removeEventListener('mousemove', draw)

      canvas.removeEventListener('touchstart', startDrawing)
      canvas.removeEventListener('touchend', stopDrawing)
      canvas.removeEventListener('touchmove', draw)
    }
  }, [lineWidth])

  useEffect(() => {
    if (clearTrigger) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      clearCanvas(canvas, ctx)
      if (onClearComplete) onClearComplete()
    }
  }, [clearTrigger, onClearComplete])

  const handleClear = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    clearCanvas(canvas, ctx)
  }

  return (
    <div className='canvas-container'>
      <canvas id='canvas' ref={canvasRef}></canvas>
      <div className='button-group'>
        <button id='clear' title='Clear canvas' onClick={handleClear}>
          <AiOutlineClear style={{ width: '60px', height: '30px' }} />
        </button>
        <button id="answer" title="submit answer" onClick={handlePredict}>Answer</button>
      </div>
    </div>
  )
}

Canvas.propTypes = {
  clearTrigger: PropTypes.bool.isRequired,
  onClearComplete: PropTypes.func,
  handlePredict: PropTypes.func.isRequired
}

export default Canvas
