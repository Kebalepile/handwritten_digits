import React from 'react'

const Progress = ({ onBackToHome }) => {
  return (
    <div className='container'>
      <h2>Your Progress</h2>
      <div id='progress-details'></div>
      <button onClick={onBackToHome}>Back to Home</button>
    </div>
  )
}

export default Progress
