import React from 'react';
import DialStyles from './styles/DialStyles';

const Dial = ({ modifyMinutes, minutes, title }) => {
    return (
        <DialStyles>
            <p>{title}</p>
            <button onClick={() => modifyMinutes(-1)}>-</button>
            {minutes}
            <button onClick={() => modifyMinutes(1)}>+</button>
        </DialStyles>
    );
}

export default Dial;