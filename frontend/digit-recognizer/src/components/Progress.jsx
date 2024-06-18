import React from 'react'
import PropTypes from 'prop-types'

const Progress = ({ onBackToHome }) => {
  return (
    <div className='container'>
      <h2>Your Progress</h2>
      <div id='progress-details'></div>
      <button onClick={onBackToHome}>Back to Home</button>
    </div>
  )
}

Progress.PropTypes = {
  onBackToHome: PropTypes.func.isRequired
}

export default Progress
