import React from 'react';
import DialStyles from './styles/DialStyles';

const Dial = ({ modifyMinutes, minutes, title }) => {
    return (
        <DialStyles data-testid="dial">
            <p>{title}</p>
            <button onClick={() => modifyMinutes(-1)}>-</button>
            <span>{minutes}</span>
            <button onClick={() => modifyMinutes(1)}>+</button>
        </DialStyles>
    );
}

export default Dial;