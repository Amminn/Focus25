import React from "react";
import FocusTime from "./FocusTime";
import TimeConfiguration from "./TimeConfiguration";
import BreakTime from "./BreakTime";
import noteIcon from "./assets/bx-notepad.svg";
import Note from './Note'
// import notificationSound from './assets/mixkit-happy-bell-alert-601.wav'
import newNotification from './assets/audiomass-output-edited.wav'

function App() {
  const [focusTime, setFocusTime] = React.useState({ minutes: '25', seconds: '00' });
  const [breakTime, setBreakTime] = React.useState({ minutes: '05', seconds: '00' });
  const [userTime, setUserTime] = React.useState({
    focus: { minutes: '25', seconds: '00' },
    break: { minutes: '05', seconds: '00' },
  });
  const [mode, setMode] = React.useState('configuration');
  const [isActive, setIsActive] = React.useState(false);
  const [notePadToggle, setNotePadToggle] = React.useState(false)
  // after 4 session increase the break time a little bit once

  // configuration / focusTime / breakTime / PauseRun / mode
  function rememberUserTime () {
    setUserTime(prev => ({
      focus: {minutes: focusTime.minutes, seconds: focusTime.seconds},
      break: {minutes: breakTime.minutes, seconds: breakTime.seconds}
    }))
  }

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

  const audio = new Audio(newNotification)

  React.useEffect(() => {
    let intervalId;
    if (isActive && mode === 'focus') {
      intervalId = setInterval(() => {
        setFocusTime(prevTime => {
          const seconds = prevTime.seconds === '00' ? '59' : String(Number(prevTime.seconds) - 1).padStart(2, '0');
          const minutes = seconds === '59' ? String(Number(prevTime.minutes) - 1).padStart(2, '0') : prevTime.minutes;
          if (minutes === '00' && seconds === '00') {
            audio.play()
            setNotePadToggle(true)
            setMode('break');
            setIsActive(false)
            clearInterval(intervalId);
          }
          return { minutes, seconds };
        });
      }, 1000);
    } else if (isActive && mode === 'break') {
      intervalId = setInterval(() => {
        setBreakTime(prevTime => {
          const seconds = prevTime.seconds === '00' ? '59' : String(Number(prevTime.seconds) - 1).padStart(2, '0');
          const minutes = seconds === '59' ? String(Number(prevTime.minutes) - 1).padStart(2, '0') : prevTime.minutes;
          if (minutes === '00' && seconds === '00') {
            setFocusTime({minutes: userTime.focus.minutes, seconds: userTime.focus.seconds})
            setBreakTime({minutes: userTime.break.minutes, seconds: userTime.break.seconds})
            setNotePadToggle(false)
            audio.play()
            setMode('focus');
            setIsActive(false)
            clearInterval(intervalId);
          }
          return { minutes, seconds };
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive, mode]);


  console.log(focusTime)
  console.log(breakTime)

  return (
    <div className="extension-container">
      <div className="header">
        <a onClick={() => (setNotePadToggle(prev => !prev))} className="note-toggle" title="Toggle NotePad">
        <img
          src={noteIcon}
          className="icon"
          alt="Note Icon"
        />
        </a>
      </div>

      <div className="main">
        {mode === 'configuration' && (
            <TimeConfiguration
              focusTime={focusTime}
              breakTime={breakTime}
              handleBreakTimeChange={handleBreakTimeChange}
              handleFocusTimeChange={handleFocusTimeChange}
            />
          )
        }
        {mode === 'focus' && (
          <FocusTime
            focusTime={focusTime}
          />
        )}
        {mode === 'break' && (
          <BreakTime
            breakTime={breakTime}
          />
        )}
      </div>

      {notePadToggle && (
        <Note />
      )}

      <div className="buttons-wrapper">
        {(mode === 'focus' || mode === 'break') && (
          <>
            <button
              onClick={() => (setIsActive(prev => !prev))}
            >
              {isActive ? 'Pause' : 'Continue'}
            </button>
            <button
              className="warning"
              onClick={() => {
                setFocusTime({ minutes: '25', seconds: '00' }),
                setBreakTime({ minutes: '05', seconds: '00' }),
                setIsActive(false)
                setMode('configuration')
              }}
              >
              Reset
            </button>
          </>
        )}
      </div>
      {mode === 'configuration' && (
        <button
          onClick={() => {
            (
              setIsActive(true),
              setMode('focus'),
              rememberUserTime()
            )
          }}
          className="button-btn single"
        >
          Start
        </button>
      )}
    </div>
  )
}

export default App