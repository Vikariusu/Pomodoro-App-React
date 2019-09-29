import React, { useState, useRef } from 'react';
import './App.css';
import Clock from './Clock';
import Dial from './Dial';
import { useInterval } from './hooks/useInterval';

function App() {
  const [isRunning, setRunning] = useState(false);
  const [isBreak, setBreak] = useState(false);
  const [cycles, setCycles] = useState(0);
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [timeRemaining, setTimeRemaining] = useState(1500);
  const intervalRef = useRef(null);

  function startClock() {
    setRunning(true);
  }

  useInterval(() => {
    if (isRunning) {
      // work cycle completed
      if (timeRemaining === 0 && !isBreak) {
        setCycles(cycles + 1);
        setBreak(true);
        setTimeRemaining(breakMinutes * 60);
      }
      // break cycle completed
      else if (timeRemaining === 0 && isBreak) {
        setBreak(false);
        setTimeRemaining(workMinutes * 60);
      }
      // decrement time 
      else {
        const newTime = timeRemaining - 1
        setTimeRemaining(newTime);
      }
    }
  }, 1000)

  const resetClock = () => {
    setRunning(false);
    setTimeRemaining(workMinutes * 60);
  }

  const modifyWorkMinutes = (difference) => {
    const newWorkMinutes = workMinutes + difference;
    if (newWorkMinutes > 0) {
      setWorkMinutes(newWorkMinutes);

      if (!isRunning && !isBreak) {
        setTimeRemaining(newWorkMinutes * 60);
      }
    }
  }

  const modifyBreakMinutes = (difference) => {
    const newBreakMinutes = breakMinutes + difference;
    if (newBreakMinutes > 0) {
      setBreakMinutes(newBreakMinutes)
    }
  }

  return (
    <div className="App">
      <p>Cycles completed: {cycles}</p>
      <Dial
        modifyMinutes={modifyWorkMinutes}
        minutes={workMinutes}
        title='Work'
      />
      <Dial
        modifyMinutes={modifyBreakMinutes}
        minutes={breakMinutes}
        title='Break'
      />
      <Clock timeRemaining={timeRemaining} />
      <button onClick={startClock}>Start</button>
      <button onClick={resetClock}>Reset</button>
    </div >
  );
}

export default App;
