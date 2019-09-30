import React from 'react';
import { ReactComponent as Image } from './undraw_multitasking.svg';
import styled from 'styled-components';

const Icon = styled.svg`
    resize: 'horizontal';
    overflow: 'hidden';
    width: '1000px';
    height: 'auto';
`;

const SvgImage = () => {
    return (
        <Icon>
            <Image
            />
        </Icon>

    );
}

export default SvgImage;