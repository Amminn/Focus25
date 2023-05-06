import React from 'react'

function FocusTime({focusTime}) {
  document.title = `${focusTime.minutes}:${focusTime.seconds}Min`
  return (
    <div className="work">
      <h2>Focus Time</h2>
      <p>{focusTime.minutes}:{focusTime.seconds}Min</p>
    </div>
  )
}

export default FocusTime