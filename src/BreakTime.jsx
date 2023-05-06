import React from 'react'

function BreakTime({breakTime}) {
  document.title = `Break: ${breakTime.minutes}:${breakTime.seconds}Min`
  return (
    <div className="work">
      <h2>Break Time</h2>
      <p>{breakTime.minutes}:{breakTime.seconds}Min</p>
  </div>
  )
}

export default BreakTime