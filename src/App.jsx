import React from "react"
import noteIcon from "./assets/bx-notepad.svg"

function App() {
  const [focusTime, setFocusTime] = React.useState({ minutes: '25', seconds: '00' });
  const [breakTime, setBreakTime] = React.useState({ minutes: '05', seconds: '00' });
  const [focusTimeIsRunning, setFocusTimeIsRunning] = React.useState(false);

  console.log(focusTime)

  function handleFocusTimeChange(e) {
    const { name, value } = e.target;

    let time = parseInt(value);
    let maxTime = name === 'minutes' ? 99 : 59;

    if (time > maxTime) {
      time = maxTime;
    } else if (time < 0) {
      time = 0;
    }

    // Add leading zero if the entered value is a single digit number
    const formattedTime = time < 10 ? `0${time}` : `${time}`;
    setFocusTime(prevBreakTime => {
      return { ...prevBreakTime, [name]: formattedTime };
    });
  }

  function handleBreakTimeChange(e) {
    const { name, value } = e.target;

    let time = parseInt(value);
    let maxTime = name === 'minutes' ? 99 : 59;

    if (time > maxTime) {
      time = maxTime;
    } else if (time < 0) {
      time = 0;
    }

    // Add leading zero if the entered value is a single digit number
    const formattedTime = time < 10 ? `0${time}` : `${time}`;
    setBreakTime(prevBreakTime => {
      return { ...prevBreakTime, [name]: formattedTime };
    });
  }

  React.useEffect(() => {
    let intervalId = null;

    if (focusTimeIsRunning) {
      const countdown = () => {
        if (focusTime.minutes === '00' && focusTime.seconds === '00') {
          clearInterval(intervalId);
        } else {
          let seconds = parseInt(focusTime.seconds);
          let minutes = parseInt(focusTime.minutes);

          if (seconds === 0) {
            minutes--;
            seconds = 59;
          } else {
            seconds--;
          }

          const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
          const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

          setFocusTime({ minutes: formattedMinutes, seconds: formattedSeconds });
        }
      };

      intervalId = setInterval(countdown, 1000);

      return () => clearInterval(intervalId);
    }
  }, [focusTime, focusTimeIsRunning]);

  return (
    <div className="extension-container">
      <div className="header">
        {/* <h2 className="logo">Focus25</h2> */}
        <a href="" className="note-toggle">
        <img
          src={noteIcon}
          className="icon"
          alt="Note Icon"
        />
        </a>
      </div>

      <div className="main">
        <div className="input-container">
          <span>Timer: </span>
          <input
            className="input focus min-input"
            name="minutes"
            id="hours-input"
            type="number"
            value={focusTime.minutes}
            onChange={handleFocusTimeChange}
            maxLength={2}
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
          <span>min</span>
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
          <span>min</span>
        </div>

      </div>
      <div className="buttons-wrapper">
        <button
          onClick={() => {
            setFocusTimeIsRunning(false),
            setFocusTime({ minutes: '25', seconds: '00' })
          }}
        >
          reset
        </button>
        <button
          onClick={() => {setFocusTimeIsRunning(false)}}
        >
          pause
        </button>
      </div>
      <button
        onClick={() => {setFocusTimeIsRunning(true)}}
        className="button-btn single"
      >Start</button>
    </div>
  )
}

export default App



