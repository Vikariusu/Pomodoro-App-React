import React, { useState, useRef } from 'react';
import './App.css';
import styled from 'styled-components';
import { Square, Triangle } from './styles/ButtonStyles';

import Clock from './Clock';
import Dial from './Dial';
import { useInterval } from './hooks/useInterval';


// TODO: move to separate files
const Wrapper = styled.div`
  margin: 0 30vw;
  text-align: center;
  font-size: 1em;

  h1 {
    margin-bottom: 18px;
  }
  h3 {
    margin: 0 0 48px 0;
    font-size: 1.4em;
  }

  .about {
    position: absolute;
    bottom: 30px;
    left: 18px;
    text-align: left;
    width: 24%;
    line-height: 1.6;

    @media (max-width: 1000px) {
      width: 40%;
      font-size: 0.9em;
    }
  }
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 16px 0;
`;

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

  // adds or subtracts workMinutes
  const modifyWorkMinutes = (difference) => {
    const newWorkMinutes = workMinutes + difference;
    if (newWorkMinutes > 0) {
      setWorkMinutes(newWorkMinutes);

      if (!isRunning && !isBreak) {
        setTimeRemaining(newWorkMinutes * 60);
      }
    }
  }

  // adds or subtracts breakMinutes
  const modifyBreakMinutes = (difference) => {
    const newBreakMinutes = breakMinutes + difference;
    if (newBreakMinutes > 0) {
      setBreakMinutes(newBreakMinutes)
    }
  }

  return (
    <Wrapper>
      <h1>Pomodoro</h1>
      <h3>{isBreak ? 'Break time' : 'Time to get to work'}</h3>
      <Buttons>
        <Dial
          modifyMinutes={modifyWorkMinutes}
          minutes={workMinutes}
          title='work'
        />
        <Dial
          modifyMinutes={modifyBreakMinutes}
          minutes={breakMinutes}
          title='break'
        />
      </Buttons>
      <Clock timeRemaining={timeRemaining} />
      <p>Cycles completed: {cycles}</p>
      <Buttons>
        <Triangle onClick={startClock} className={isRunning ? 'active' : ''} />
        <Square onClick={resetClock} />
      </Buttons>
    </Wrapper >
  );
}

export default App;
