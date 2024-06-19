import React from 'react';
import PropTypes from 'prop-types';

const Achievements = ({ onBackToHome }) => {
  return (
    <div className='container'>
      <h2>Your Achievements</h2>
      <div id='achievements-details'></div>
      <button onClick={onBackToHome}>Back to Home</button>
    </div>
  );
};

Achievements.propTypes = {
  onBackToHome: PropTypes.func.isRequired
};

export default Achievements;
