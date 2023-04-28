import React from 'react'

function FocusTime({focusTime}) {
  return (
    <div className="work">
      <h2>Focus Time</h2>
      <p>{focusTime.minutes}:{focusTime.seconds}Min</p>
    </div>
  )
}

export default FocusTime