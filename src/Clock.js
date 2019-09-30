import React from 'react';
import styled, { keyframes } from 'styled-components';
import { shake } from 'react-animations';

const shakeAnimation = keyframes`${shake}`;

const ClockStyled = styled.div`
    width: 24vw;
    height: 24vw;
    border-radius: 50%;  
    margin: 0 auto;
    /* background-color: #D06A6F; */
    /* background: linear-gradient(0, #D06A6F 90%,  #60AE58 5%);  */
    background: rgb(61,206,38);
    background: linear-gradient(0deg, #60AE58 10%, #D06A6F 10%, #D06A6F 90%, #60AE58 10%);
    transition-property: width, height;
    transition-duration: 0.5s;
    position: relative;

    &.animated {
        animation: 1.3s ${shakeAnimation};
    }

    div {
        position: absolute;
        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        font-size: 2em;
        color: #fff;
    }
`;

const Clock = ({ timeRemaining }) => {
    let minutes = Math.floor(timeRemaining / 60);
    let seconds = timeRemaining - minutes * 60;
    let modifiedSeconds = seconds <= 9 ? `0${seconds}` : seconds;

    return (
        <ClockStyled className={timeRemaining === 0 ? 'animated' : ''}>
            <div>{minutes}:{modifiedSeconds}</div>
        </ClockStyled>
    );
}

export default Clock;
