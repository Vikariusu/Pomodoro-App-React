import styled, { keyframes } from 'styled-components';
import { shake } from 'react-animations';

const shakeAnimation = keyframes`${shake}`;

const ClockStyles = styled.div`
    margin: 0 auto;
    color: #F0E7D8;
    position: relative;
    border-top: 4px solid #F0E7D8;
    border-bottom: 4px solid #F0E7D8;
    padding: 30px 0;

    &.animated {
        animation: 1.3s ${shakeAnimation};
    }

    div {
        font-size: 3em;
    }
`;

export default ClockStyles;
