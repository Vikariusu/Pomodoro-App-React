import React, { useState } from 'react';

const Clock = ({ timeRemaining }) => {
    let minutes = Math.floor(timeRemaining / 60);
    let seconds = timeRemaining - minutes * 60;
    let modifiedSeconds = seconds <= 9 ? `0${seconds}` : seconds;

    return (
        <div>
            <span>{minutes}:{modifiedSeconds}</span>
        </div>
    );
}

export default Clock;
