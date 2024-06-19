import React, { useEffect } from 'react'

const Feedback = ({ isCorrect, onRemove }) => {
  useEffect(() => {
    const timeout = setTimeout(onRemove, 2000) // Remove feedback after 2 seconds
    return () => clearTimeout(timeout)
  }, [onRemove])

  return (
    <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
      {isCorrect ? '✔️' : '❌'}
    </div>
  )
}

export default Feedback
