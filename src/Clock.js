import React from 'react';
import ClockStyles from './styles/ClockStyles';

const Clock = ({ timeRemaining }) => {
    let minutes = Math.floor(timeRemaining / 60);
    let seconds = timeRemaining - minutes * 60;
    let modifiedSeconds = seconds <= 9 ? `0${seconds}` : seconds;

    return (
        <ClockStyles className={timeRemaining === 0 ? 'animated' : ''} data-testid="clock-container">
            <div data-testid="clock-time-remaining"><span>{minutes}</span>:<span>{modifiedSeconds}</span></div>
        </ClockStyles>
    );
}

export default Clock;
