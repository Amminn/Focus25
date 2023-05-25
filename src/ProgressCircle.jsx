import React, {useState, useEffect} from "react";
import Time from "./Time";

export default function ProgressCircle({ mode, title, time, color, isActive, change, timeStarter }) {
  const [strokeDashoffset, setStrokeDashoffset] = useState(0);
  const [finalStrokeDashoffset, setFinalStrokeDashoffset] = useState(0);

  const totalTime = parseInt(timeStarter?.minutes) * 60 + parseInt(timeStarter?.seconds);
  const remainingTime = parseInt(time.minutes) * 60 + parseInt(time.seconds);

  const calculateStrokeDashoffset = () => {
    const progress = (remainingTime / totalTime) * 628;
    return Math.floor(628 - progress);
  };

  // useEffect(() => {
  //   console.log(time)
  //   console.log('use effect did run');
  //   if (mode !== 'configuration') {
  //     console.log(calculateStrokeDashoffset());
  //     if (remainingTime > 0) {
  //       setStrokeDashoffset(calculateStrokeDashoffset());
  //     } else {
  //       setFinalStrokeDashoffset(calculateStrokeDashoffset());
  //     }
  //   }
  // }, [time]);

  useEffect(() => {
    if (mode === 'configuration' || mode !== title.toLowerCase()) {
      setStrokeDashoffset(0)
    } else if (isActive) {
      setStrokeDashoffset(calculateStrokeDashoffset())
    }
  }, [time])

  // const currentStrokeDashoffset = remainingTime > 0 ? strokeDashoffset : finalStrokeDashoffset;

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
          {mode !== 'configuration' ? <Time Time={time} />
          :
          <>
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
              value={time.seconds}
              onChange={change}
              maxLength={2}
            />
          </>
          }
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
            strokeDashoffset={strokeDashoffset}
            // strokeDashoffset={currentStrokeDashoffset}
            strokeWidth="14"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <h2 className="progress-type">{title}</h2>
    </>
  )
}