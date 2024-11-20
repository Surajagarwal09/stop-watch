import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [watch, setWatch] = useState("00:00:00:000");
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const intervalRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => {
      clearInterval(intervalRef.current);
    }
  }, [isRunning])

  function handleStart() {
    setIsRunning(true)
  };
  function timeData(time) {
    let hours = Math.floor(time / (1000 * 60 * 60));
    let minute = Math.floor(time / (1000 * 60) % 60);
    let seconds = Math.floor(time / (1000) % 60);
    let milliseconds = Math.floor(time % 1000);
    hours = String(hours).padStart(2, "0");
    minute = String(minute).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(3, "0");

    return `${hours}:${minute}:${seconds}:${milliseconds}`;
  }

  useEffect(() => {
    setWatch(timeData(time));
  }, [time])

  function handleStop() {
    setIsRunning(false)
  }

  function handleReset() {
    setIsRunning(false);
    setTime(0);
    setWatch("00:00:00:000");
  }

  return (
    <div className="App">
      <h1 className='h1'>Stop Watch</h1>
      <div className="stop-watch">
        <div className='flex'>
          <h1 className='watch'>{watch}</h1>
          <div className="buttons">
            <button className="reset-button" onClick={handleReset}>Reset</button>
            <button className="start-button" onClick={handleStart}>Start</button>
            <button className="stop-button" onClick={handleStop}>Stop</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
