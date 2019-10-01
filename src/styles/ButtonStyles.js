import styled from 'styled-components';

const Triangle = styled.div`
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 15px 0 15px 26.0px;
  border-color: transparent transparent transparent #54413C;
  margin: 5px;

  &:hover, &.active{
    position: relative;
    top: -1px;
    -webkit-filter: drop-shadow(0 2px 4px rgba(0,0,0,0.18));
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.18));
  }

  &.active {
    border-color: transparent transparent transparent #4C3B37;
    position: static;
  }
`;

const Square = styled.div`
  height: 26px;
  width: 26px;
  background-color: #5C4742;
  margin: 10px;

  &:hover {
    background-color: #5C4742;
    position: relative;
    top: -1px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.18);
  }
`;

export { Triangle, Square };
