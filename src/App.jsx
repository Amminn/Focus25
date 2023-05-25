import React from "react";
// import FocusTime from "./FocusTime";
// import TimeConfiguration from "./TimeConfiguration";
// import BreakTime from "./BreakTime";
// import noteIcon from "./assets/bx-notepad.svg";
import Note from './Note'
// // import notificationSound from './assets/mixkit-happy-bell-alert-601.wav'
// import newNotification from './assets/audiomass-output-edited.wav'
import ProgressCircle from './ProgressCircle'
import 'boxicons'
// make the count down work, make the progress bare work
function App() {
  const [focusTime, setFocusTime] = React.useState({ minutes: '00', seconds: '10' });
  const [breakTime, setBreakTime] = React.useState({ minutes: '00', seconds: '10' });
  // this one is suppose to save the
  const [userTime, setUserTime] = React.useState({
    focus: { minutes: '25', seconds: '00' },
    break: { minutes: '05', seconds: '00' },
  });

  const [mode, setMode] = React.useState('configuration');
  const [isActive, setIsActive] = React.useState(false);
  const [notePadToggle, setNotePadToggle] = React.useState(false);
  // after 4 session increase the break time a little bit once

  // configuration / focus / break / mode
  function restartHome() {
    setFocusTime({minutes: userTime.focus.minutes, seconds: userTime.focus.seconds});
    setBreakTime({minutes: userTime.break.minutes, seconds: userTime.break.seconds});
  }

  function rememberUserTime() {
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
    setFocusTime(prevFocusTime => {
      return { ...prevFocusTime, [name]: formattedTime };
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

  // const audio = new Audio(newNotification)

  // // request permission to display notifications
  // function requestNotificationPermission() {
  //   if (Notification.permission !== 'granted') {
  //     Notification.requestPermission();
  //   }
  // }

  // function titleRender(mode) {
  //   return document.title = mode === 'configuration' ? 'Focus25 App' : ''
  // }

  React.useEffect(() => {
    let intervalId;
    if (isActive && mode === 'focus') {
      intervalId = setInterval(() => {
        setFocusTime(prevTime => {
          const seconds = prevTime.seconds === '00' ? '59' : String(Number(prevTime.seconds) - 1).padStart(2, '0');
          const minutes = seconds === '59' ? String(Number(prevTime.minutes) - 1).padStart(2, '0') : prevTime.minutes;
          if (minutes === '00' && seconds === '00') {
            // see how to make it impossible to count under 00
            // audio.play()
            setNotePadToggle(true)
            setMode('break');
            setIsActive(false)
            // new Notification('Timer Finished!', {
            //   body: 'Your timer has finished!',
            // });
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
            setNotePadToggle(false)
            // audio.play()
            setMode('focus');
            setIsActive(false)
            restartHome()
            clearInterval(intervalId);
          }
          return { minutes, seconds };
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);

  }, [isActive, mode]);

  // React.useEffect(() => {
  //   titleRender(mode)
  // }, [mode])

  // return (
  //   <div className="App">
  //     <div className="header">
  //       <div className="logo">Focus25</div>
  //       <a onClick={() => (setNotePadToggle(prev => !prev))} className="note-toggle" title="Toggle NotePad">
  //         <img
  //           src={noteIcon}
  //           className="icon"
  //           alt="Note Icon"
  //         />
  //       </a>
  //     </div>

  //     <div className="main">
  //       {mode === 'configuration' && (
  //           <TimeConfiguration
  //             focusTime={focusTime}
  //             breakTime={breakTime}
  //             handleBreakTimeChange={handleBreakTimeChange}
  //             handleFocusTimeChange={handleFocusTimeChange}
  //           />
  //         )
  //       }
  //       {mode === 'focus' && (
  //         <FocusTime
  //           focusTime={focusTime}
  //         />
  //       )}
  //       {mode === 'break' && (
  //         <BreakTime
  //           breakTime={breakTime}
  //         />
  //       )}
  //     </div>

  //     {notePadToggle && (
  //       <Note />
  //     )}

  //     <div className="buttons-wrapper">
  //       {(mode === 'focus' || mode === 'break') && (
  //         <>
  //           <button
  //             onClick={() => (setIsActive(prev => !prev))}
  //           >
  //             {isActive ? 'Pause' : 'Continue'}
  //           </button>
  //           <button
  //             className="warning"
  //             onClick={() => {
  //               setFocusTime({ minutes: userTime.focus.minutes, seconds: userTime.focus.seconds }),
  //               setBreakTime({ minutes: userTime.break.minutes, seconds: userTime.break.seconds }),
  //               setIsActive(false)
  //               setMode('configuration')
  //             }}
  //             >
  //             Reset
  //           </button>
  //         </>
  //       )}
  //     </div>
  //     {mode === 'configuration' && (
  //       <button
  //         onClick={() => {
  //           (
  //             setIsActive(true),
  //             setMode('focus'),
  //             rememberUserTime(),
  //             requestNotificationPermission()
  //           )
  //         }}
  //         className="button-btn single"
  //       >
  //         Start
  //       </button>
  //     )}
  //   </div>
  // )

  const [totalFocus, setTotalFocus] = React.useState({min: '00', sec: '00'})
  console.log(focusTime)
  console.log(breakTime)
  return (
    <div className="app">

      <div className="container">
        <nav>
          <h2 className="logo">Focus25</h2>
          <h2 className="note" onClick={() => setNotePadToggle(prev => !prev)}>Note</h2>
        </nav>

        <h2 className="big-title">Focus Time</h2>
        <p className="total-focus">
          Total Focus
          <br />
          <span>40:00</span>
        </p>

        <div className="circle-container">
          <div className="progress-element">
            <div className="btn-container">
              <button>
                <box-icon
                  name='minus'
                  color='#fff'
                />
              </button>
              <button>
                <box-icon
                  name='plus'
                  color='#fff'
                />
              </button>
            </div>
            <ProgressCircle
              key='focusTime'
              time={focusTime}
              title={"Focus"}
              color={'#7012CE'}
              change={handleFocusTimeChange}
              offset={514}
              timeStarter={userTime.focus}
              mode={mode}
            />
          </div>

          {/* ========= */}

          <div className="progress-element">
            <div className="btn-container">
              <button>
                <box-icon
                  name='minus'
                  color='#fff'
                />
              </button>
              <button>
                <box-icon
                  name='plus'
                  color='#fff'
                />
              </button>
            </div>
            <ProgressCircle
              key='break231Time'
              time={breakTime}
              title={"Break"}
              color={'#1FD171'}
              change={handleBreakTimeChange}
              offset={314}
              timeStarter={userTime.break}
              mode={mode}
            />
          </div>

        </div>

        {notePadToggle && <Note />}

        {/* === here i have two style of button to switch between === */}

        {mode === 'configuration' && <div className="start-buttons bottom-buttons">
          <button
            onClick={() => {
              (
                setIsActive(true),
                setMode('focus'),
                rememberUserTime(),
                { /* requestNotificationPermission() */}
              )
            }}
            className="large-button">Start</button>
          <button className="clean">Reset</button>
        </div>}
        {mode !== 'configuration' && <div className="control-buttons bottom-buttons">
          <div className="rounded-buttons">

            <div className="button-text">
              <button
                onClick={() => setIsActive(prev => !prev)}
                className="button play"
                >
                {isActive ?
                  <box-icon name='pause' color='#ffffff' size='32px' />
                  :
                  <box-icon name='play' color='#ffffff' size='32px' />
                }
              </button>
              <h3>{isActive ? 'Pause' : 'Play'}</h3>
            </div>

            <div className="button-text">
              <button
                className="button Reset"
                onClick={() => {
                  console.log('i did top')
                  setIsActive(false),
                  setMode('configuration'),
                  // set the timer to it's start value
                  restartHome()
                  //setBreakTime({minutes: userTime.break.minutes, seconds: userTime.break.seconds})

                }}
              >
                <box-icon name='stop' color='#ffffff' size='32px' />
              </button>
              <h3>Stop</h3>
            </div>

          </div>
          <button
            className="clean"
            onClick={() => {
              setMode('configuration'),
              restartHome()
            }}
          >Quit</button>
        </div>}

      </div>
    </div>
  )
}

export default App