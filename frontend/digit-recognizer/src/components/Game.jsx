import React, { useState, useEffect } from 'react'
import ArithmeticQuiz from '../utils/ArithmeticQuiz' // Adjust the path based on your project structure
import equations from '../data/basic_arithmetic_equations.json' // Import your JSON data
import Canvas from './Canvas' // Assuming Canvas component is in the same directory
import PropTypes from 'prop-types'
import { RiHome3Fill } from 'react-icons/ri'

const Game = ({ onBackToHome }) => {
  const [quizState, setQuizState] = useState('') // State to manage quiz messages
  const [userAnswer, setUserAnswer] = useState('') // State to manage user's answer
  const [currentQuestion, setCurrentQuestion] = useState('') // State to manage current quiz question
  const [quiz, setQuiz] = useState(null) // State to manage the quiz instance
  const [clearCanvasTrigger, setClearCanvasTrigger] = useState(false) // State to manage canvas clearing

  useEffect(() => {
    startQuiz() // Start quiz when component mounts
  }, [])

  const updateQuizState = message => {
    setQuizState(message)
  }

  const startQuiz = () => {
    const newQuiz = new ArithmeticQuiz(equations, updateQuizState)
    setQuiz(newQuiz)
    setCurrentQuestion(newQuiz.getCurrentQuestion()) // Set initial quiz question
    setClearCanvasTrigger(true) // Clear canvas when quiz starts
  }

  const handlePredict = () => {
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
        input.push(255 - grayscale) // Invert colors
      }

      const formData = new FormData()
      formData.append('input', JSON.stringify(input))

      fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          // console.log('Predicted digit: ' + data.digit);
          setUserAnswer(data.digit) // Set predicted digit as user answer
          if (quiz) {
            const isCorrect = quiz.checkAnswer(data.digit) // Check the current question's answer
            if (isCorrect || quiz.remainingAttempts === 0) {
              setClearCanvasTrigger(true) // Trigger canvas clearing
            }
            if (!quiz.currentQuestion) {
              setCurrentQuestion(quiz.getCurrentQuestion()) // Set the next question
            } else {
              setCurrentQuestion(quiz.currentQuestion[0]) // Stay on the current question
            }
          }
        })
        .catch(error => console.error('Error:', error))
    }
  }

  const handleClearComplete = () => {
    setClearCanvasTrigger(false) // Reset clear canvas trigger
  }

  return (
    <div className='containerr' style={{margin:"auto"}}>
      <button id='home' onClick={onBackToHome}>
        <RiHome3Fill />
      </button>
      <h2 id='problem'>Problem: {currentQuestion}</h2>
      <Canvas
        clearTrigger={clearCanvasTrigger}
        onClearComplete={handleClearComplete}
        handlePredict={handlePredict}
      />

      <div id='predicted'>
        <p>Predicted Answer: {userAnswer}</p> {/* Display predicted answer */}
        <div id='result'>{quizState}</div> {/* Display quiz state message */}
      </div>
    </div>
  )
}
Game.PropTypes = {
  onBackToHome: PropTypes.func.isRequired
}

export default Game
