import React from 'react'

function TimeConfiguration({focusTime, breakTime, handleFocusTimeChange, handleBreakTimeChange}) {
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <div className="input-container">
        <h2>Set the Timer</h2>
        <span>Timer: </span>
        <input
          className="input focus min-input"
          name="minutes"
          id="hours-input"
          type="number"
          value={focusTime.minutes}
          onChange={handleFocusTimeChange}
          maxLength={2}
          ref={inputRef}
        />
        <span>:</span>
        <input
          className="input focus sec-input"
          name="seconds"
          id="minutes-input"
          type="number"
          value={focusTime.seconds}
          onChange={handleFocusTimeChange}
          maxLength={2}
        />
        <span>Min</span>
     </div>

      <div className="input-container">
        <span>Break: </span>
        <input
          className="input focus min-input"
          name="minutes"
          type="number"
          value={breakTime.minutes}
          onChange={handleBreakTimeChange}
          maxLength={2}
        />
        <span>:</span>
        <input
          className="input focus sec-input"
          name="seconds"
          type="number"
          value={breakTime.seconds}
          onChange={handleBreakTimeChange}
          maxLength={2}
        />
        <span>Min</span>
      </div>
    </>
  )
}

export default TimeConfiguration