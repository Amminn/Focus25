
export default function ProgressCircle({title, time, color, offset, change}) {
  // time value
  // progress circle
  // based on the time calculate the progress circle
  // color
  return (
    <>
      <div className="progress-circle">
        {/* remember that this should be input at first */}
        {/* <h2 className="timer">{time}</h2> */}
        <div className="input-container">
        <input
          className="input focus min-input"
          name="minutes"
          id="hours-input"
          type="number"
          value={time.minutes}
          // value={'20'}
          onChange={change}
          maxLength={2}
          // ref={inputRef}
        />
        <span>:</span>
        <input
          className="input focus sec-input"
          name="seconds"
          id="minutes-input"
          type="number"
          // value={focusTime.seconds}
          value={"23"}
          // onChange={handleFocusTimeChange}
          maxLength={2}
        />
     </div>

        <svg className="background-circle circle" width="220" height="220">
          <circle
            cx="110"
            cy="110"
            r="100"
            fill="transparent"
            stroke="#E9E9FF"
            strokeWidth="14"
            // strokeDasharray="628"
          />
        </svg>
        <svg className="progress circle" width="220" height="220">
          <circle
            cx="110"
            cy="110"
            r="100"
            fill="transparent"
            stroke={color}
            strokeDasharray="628"
            strokeDashoffset={offset}
            strokeWidth="14"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <h2 className="progress-type">{title}</h2>
    </>
  )
}