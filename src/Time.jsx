import React from 'react'

function FocusTime({Time}) {
  document.title = `Focus: ${Time.minutes}:${Time.seconds}Min`
  return (
    <p className="time-paragraph" number="true">{Time.minutes}:{Time.seconds}</p>
  )
}

export default FocusTime