import React, { useState } from 'react'
import Welcome from './components/Welcome'
import Game from './components/Game'
// import Progress from './components/Progress'
// import Achievements from './components/Achievements'
import './styles.css'

const App = () => {
  const [screen, setScreen] = useState('welcome')

  const handleStartGame = () => setScreen('game')
  // const handleViewProgress = () => setScreen('progress')
  // const handleViewAchievements = () => setScreen('achievements')
  const handleBackToHome = () => setScreen('welcome')

  return (
    <div>
      {screen === 'welcome' && (
        <Welcome
          onStartGame={handleStartGame}
          // onViewProgress={handleViewProgress}
          // onViewAchievements={handleViewAchievements}
        />
      )}
      {screen === 'game' && <Game onBackToHome={handleBackToHome} />}
      {/* {screen === 'progress' && <Progress onBackToHome={handleBackToHome} />}
      {screen === 'achievements' && (
        <Achievements onBackToHome={handleBackToHome} />
      )} */}
    </div>
  )
}

export default App
