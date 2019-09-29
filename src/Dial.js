import React from 'react';

const Dial = ({ modifyMinutes, minutes, title }) => {
    return (
        <div>
            <p>{title}</p>
            <button onClick={() => modifyMinutes(-1)}>-</button>
            {minutes}
            <button onClick={() => modifyMinutes(1)}>+</button>
        </div>
    );
}

export default Dial;