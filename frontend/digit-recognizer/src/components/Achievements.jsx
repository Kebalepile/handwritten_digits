import React from 'react'

const Achievements = ({ onBackToHome }) => {
  return (
    <div className='container'>
      <h2>Your Achievements</h2>
      <div id='achievements-details'></div>
      <button onClick={onBackToHome}>Back to Home</button>
    </div>
  )
}

export default Achievements
