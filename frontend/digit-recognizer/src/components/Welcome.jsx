import React from 'react';
import PropTypes from 'prop-types';

const Welcome = ({ onStartGame }) => {
  return (
    <div className='container'>
      <div>
        <h2> Basic Arithmetic Learning Game!</h2>
        <button id='start-button' onClick={onStartGame}>
          play
        </button>
      </div>
      {/* <button onClick={onViewProgress}>View Progress</button> */}
      {/* <button onClick={onViewAchievements}>View Achievements</button> */}
    </div>
  );
};

Welcome.propTypes = {
  onStartGame: PropTypes.func.isRequired,
  // onViewProgress: PropTypes.func.isRequired,
  // onViewAchievements: PropTypes.func.isRequired
};

export default Welcome;
