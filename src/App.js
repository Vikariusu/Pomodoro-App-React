import React, { useState, useRef } from 'react';
import './App.css';
import styled from 'styled-components';
import Clock from './Clock';
import Dial from './Dial';
import { useInterval } from './hooks/useInterval';
import SvgImage from './SvgImage';

// TODO: move to separate files
const Wrapper = styled.div`
  margin: 0 auto;
  text-align: center;
  color: hsl(209, 8%, 17%);

  h3 {
    color: #272727;
  }

  .about {
    position: absolute;
    bottom: 30px;
    left: 18px;
    text-align: left;
    width: 24%;
    line-height: 1.6;
  }
`;

const Triangle = styled.div`
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 17.5px 0 17.5px 30.3px;
  border-color: transparent transparent transparent #60AE58;
  margin: 5px;

  &:hover {
    border-color: transparent transparent transparent #4F8F49;
    position: relative;
    top: -1px;
  }
`;

const TriangleAbout = styled.div`
position: absolute;
bottom: 0;
  width: 0;
  height: 0;
  border-style: solid;
border-width: 520px 0 0 680px;
  border-color: transparent transparent transparent #AB9B96;
`;

const Square = styled.div`
  height: 30px;
  width: 30px;
  background-color: #AB9B96;
  margin: 5px;

  &:hover {
    background-color: #8C7F7B;
    position: relative;
    top: -1px;
  }
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
`;

function App() {
  const [isRunning, setRunning] = useState(false);
  const [isBreak, setBreak] = useState(false);
  const [cycles, setCycles] = useState(0);
  const [workMinutes, setWorkMinutes] = useState(1);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [timeRemaining, setTimeRemaining] = useState(15);
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
    <Wrapper>
      <h1>Pomodoro</h1>
      <h3>{isBreak ? 'Break time' : 'Time to get to work'}</h3>
      <p>Cycles completed: {cycles}</p>
      <Buttons>
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
      </Buttons>
      <Clock timeRemaining={timeRemaining} />

      <Buttons>
        <Triangle onClick={startClock} />
        <Square onClick={resetClock} />
      </Buttons>
      {/* <SvgImage /> */}

      <TriangleAbout />
      <p className="about">The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. The technique uses a timer to break down work into intervals, traditionally 25 minutes in length, separated by short breaks. Each interval is known as a pomodoro, from the Italian word for 'tomato', after the tomato-shaped kitchen timer that Cirillo used as a university student.</p>
    </Wrapper>
  );
}

export default App;
