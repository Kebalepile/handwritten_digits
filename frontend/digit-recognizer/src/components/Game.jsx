import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import ArithmeticQuiz from '../utils/arithmeticQuiz'
import equations from '../data/basic_arithmetic_equations.json'
import Canvas from './Canvas'
import Loading from './Loading'
import Feedback from './Feedback'
import { RiHome3Fill } from 'react-icons/ri'

const Game = ({ onBackToHome }) => {
  const [responseMessage, setResponseMessage] = useState('')
  const [predictedAnswer, setPredictedAnswer] = useState('')
  const [currentQuestion, setCurrentQuestion] = useState('')
  const [quiz, setQuiz] = useState(null)
  const [clearCanvasTrigger, setClearCanvasTrigger] = useState(false)
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState({ show: false, isCorrect: false })

  useEffect(() => {
    startQuiz()
  }, [])

  const updateResponseMessage = message => {
    setResponseMessage(message)
  }

  const startQuiz = () => {
    const newQuiz = new ArithmeticQuiz(equations, updateResponseMessage)
    setQuiz(newQuiz)
    setCurrentQuestion(newQuiz.getCurrentQuestion())
    setClearCanvasTrigger(true)
  }

  const handlePredict = () => {
    setLoading(true)
    const canvas = document.getElementById('canvas')
    const imgData = canvas.toDataURL('image/png')
    const img = new Image()
    img.src = imgData
    img.onload = () => {
      const tempCanvas = document.createElement('canvas')
      const tempCtx = tempCanvas.getContext('2d')
      tempCanvas.width = 28
      tempCanvas.height = 28
      tempCtx.drawImage(img, 0, 0, 28, 28)

      const imageData = tempCtx.getImageData(0, 0, 28, 28)
      const data = imageData.data

      const input = []
      for (let i = 0; i < data.length; i += 4) {
        const grayscale = (data[i] + data[i + 1] + data[i + 2]) / 3
        input.push(255 - grayscale)
      }

      const formData = new FormData()
      formData.append('input', JSON.stringify(input))

      fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          setPredictedAnswer(data.digit)
          if (quiz) {
            const isCorrect = quiz.checkAnswer(data.digit)
            setFeedback({ show: true, isCorrect })
            if (isCorrect || quiz.remainingAttempts === 0) {
              setClearCanvasTrigger(true)
            }
            if (!quiz.currentQuestion) {
              setCurrentQuestion(quiz.getCurrentQuestion())
            } else {
              setCurrentQuestion(quiz.currentQuestion[0])
            }
          }
          setLoading(false)
        })
        .catch(error => {
          console.error('Error:', error)
          setLoading(false)
        })
    }
  }

  const handleClearComplete = () => {
    setClearCanvasTrigger(false)
  }

  const removeFeedback = () => {
    setFeedback({ show: false, isCorrect: false })
  }

  return (
    <div
      className='game-container'
      style={{ margin: 'auto', position: 'relative' }}
    >
      <button id='home' onClick={onBackToHome}>
        <RiHome3Fill />
      </button>
      <h2 id='problem'>Problem: {currentQuestion}</h2>
      <hr />
      <Canvas
        clearTrigger={clearCanvasTrigger}
        onClearComplete={handleClearComplete}
        handlePredict={handlePredict}
      />

      {loading && <Loading />}
      {feedback.show && (
        <Feedback
          isCorrect={feedback.isCorrect}
          onRemove={removeFeedback}
          predictedAnswer={predictedAnswer}
          responseMessage={responseMessage}
        />
      )}
    </div>
  )
}

Game.propTypes = {
  onBackToHome: PropTypes.func.isRequired
}

export default Game
