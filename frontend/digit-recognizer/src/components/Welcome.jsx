import React from 'react'

const Welcome = ({ onStartGame, onViewProgress, onViewAchievements }) => {
  return (
    <div className='container'>
      <h1>Welcome to Number Learning Game!</h1>
      <button onClick={onStartGame}>Start New Game</button>
      <button onClick={onViewProgress}>View Progress</button>
      <button onClick={onViewAchievements}>View Achievements</button>
    </div>
  )
}

export default Welcome
