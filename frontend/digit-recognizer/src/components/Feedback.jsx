import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

const Feedback = ({
  isCorrect,
  onRemove,
  responseMessage,
  predictedAnswer
}) => {
  useEffect(() => {
    const timeout = setTimeout(onRemove, 6000) // Remove feedback after 2 seconds
    return () => clearTimeout(timeout)
  }, [onRemove])

  return (
    <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
      {isCorrect ? '✔️' : '❌'}
      <div id='predicted'>
        {!isCorrect && <p>predicted answer: {predictedAnswer}</p>}
        <div id='result'>{responseMessage}</div>
      </div>
    </div>
  )
}

Feedback.propTypes = {
  isCorrect: PropTypes.bool.isRequired,
  onRemove: PropTypes.func.isRequired,
  responseMessage: PropTypes.string.isRequired,
  predictedAnswer: PropTypes.string.isRequired
}
export default Feedback
