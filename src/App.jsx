import React from "react";
import FocusTime from "./FocusTime";
import TimeConfiguration from "./TimeConfiguration";
import BreakTime from "./BreakTime";
import noteIcon from "./assets/bx-notepad.svg";

function App() {
  const [focusTime, setFocusTime] = React.useState({ minutes: '25', seconds: '00' });
  const [breakTime, setBreakTime] = React.useState({ minutes: '05', seconds: '00' });
  const [focusTimeIsRunning, setFocusTimeIsRunning] = React.useState(false);
  const [shouldPause, setShouldPause] = React.useState(false)
  const [isBreakTurn, setIsBreakTurn] = React.useState(false)

  console.log(shouldPause)
  console.log(breakTime)

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

  const intervalIdRef = React.useRef(null);

  React.useEffect(() => {
    const countdown = () => {
      let currentTimer = isBreakTurn ? breakTime : focusTime;
      if (focusTime.minutes == '00' && focusTime.seconds === '00') {
        setIsBreakTurn(true)
      }
      if (currentTimer.minutes === '00' && currentTimer.seconds === '00') {
        clearInterval(intervalIdRef.current);
      } else {
        let seconds = parseInt(currentTimer.seconds);
        let minutes = parseInt(currentTimer.minutes);

        if (!shouldPause) {
          if (seconds === 0) {
            minutes--;
            seconds = 59;
          } else {
            seconds--;
          }

          const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
          const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
          isBreakTurn ? setBreakTime({ minutes: formattedMinutes, seconds: formattedSeconds })
                      : setFocusTime({ minutes: formattedMinutes, seconds: formattedSeconds });
        }
      }
    };

    if (focusTimeIsRunning) {
      intervalIdRef.current = setInterval(countdown, 1000);
    } else {
      clearInterval(intervalIdRef.current);
    }

    return () => clearInterval(intervalIdRef.current);
  }, [focusTime, focusTimeIsRunning, shouldPause, isBreakTurn, breakTime]);  
  // React.useEffect(() => {
  //   let intervalId = null;

  //   const countdown = () => {
  //     let currentBreak
  //     isBreakTurn ? currentBreak = breakTime : currentBreak = focusTime
  //     if (focusTime.minutes === '00' && focusTime.seconds === '00') {
  //       clearInterval(intervalId);
  //     } else {
  //       let seconds = parseInt(focusTime.seconds);
  //       let minutes = parseInt(focusTime.minutes);

  //       if (!shouldPause) { // only update the time if shouldPause is false
  //         if (seconds === 0) {
  //           minutes--;
  //           seconds = 59;
  //         } else {
  //           seconds--;
  //         }

  //         const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  //         const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

  //         setFocusTime({ minutes: formattedMinutes, seconds: formattedSeconds });
  //       }
  //     }
  //   };

  //   if (focusTimeIsRunning) {
  //     intervalId = setInterval(countdown, 1000);
  //   }

  //   return () => clearInterval(intervalId);
  // }, [focusTime, focusTimeIsRunning, shouldPause]);


  // React.useEffect(() => {
  //   let intervalId = null;

  //   if (focusTimeIsRunning) {
  //     const countdown = () => {
  //       if (focusTime.minutes === '00' && focusTime.seconds === '00') {
  //         clearInterval(intervalId);
  //       } else {
  //         let seconds = parseInt(focusTime.seconds);
  //         let minutes = parseInt(focusTime.minutes);

  //         if (seconds === 0) {
  //           minutes--;
  //           seconds = 59;
  //         } else {
  //           seconds--;
  //         }

  //         const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  //         const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

  //         setFocusTime({ minutes: formattedMinutes, seconds: formattedSeconds });
  //       }
  //     };

  //     intervalId = setInterval(countdown, 1000);

  //     return () => clearInterval(intervalId);
  //   }
  // }, [focusTime, focusTimeIsRunning]);
//
  return (
    <div className="extension-container">
      <div className="header">
        <a href="" className="note-toggle" title="Toggle NotePad">
        <img
          src={noteIcon}
          className="icon"
          alt="Note Icon"
        />
        </a>
      </div>

      <div className="main">
        {
          !focusTimeIsRunning ?
          <TimeConfiguration
            focusTime={focusTime}
            breakTime={breakTime}
            handleBreakTimeChange={handleBreakTimeChange}
            handleFocusTimeChange={handleFocusTimeChange}
          />
          :
          !isBreakTurn ?
          <FocusTime
            focusTime={focusTime}
          />
          :
          <BreakTime
            breakTime={breakTime}
          />
        }
      </div>

      {
        focusTimeIsRunning ?
        <div className="buttons-wrapper">
          <button
            // onClick={() => {setFocusTimeIsRunning(false), setShouldPause(true)}}
            onClick={() => {setShouldPause(prev => !prev)}}
          >
            {shouldPause ? 'Continue' : 'Pause'}
          </button>
          <button
            className="warning"
            onClick={() => {
              setFocusTimeIsRunning(false),
              setFocusTime({ minutes: '25', seconds: '00' }),
              setBreakTime({ minutes: '05', seconds: '00'})
            }}
          >
            reset
          </button>
        </div>
        :
        <button
          onClick={() => {setFocusTimeIsRunning(true)}}
          className="button-btn single"
        >
          Start
        </button>
      }
    </div>
  )
}

export default App