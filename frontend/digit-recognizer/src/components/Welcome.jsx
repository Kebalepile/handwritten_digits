import React from 'react'
import PropTypes from 'prop-types'

const Welcome = ({ onStartGame }) => {
  return (
    <div className='container'>
      <h2> Basic Arithmetic Learning Game!</h2>
      <button onClick={onStartGame}>Start New Game</button>
      {/* <button onClick={onViewProgress}>View Progress</button> */}
      {/* <button onClick={onViewAchievements}>View Achievements</button> */}
    </div>
  )
}

Welcome.PropTypes = {
  onStartGame: PropTypes.func.isRequired
  // onViewProgress: PropTypes.func.isRequired,
  // onViewAchievements: PropTypes.func.isRequired
}

export default Welcome
