import React from 'react';
import styled from 'styled-components';

const Day = styled.div`
  width: 100%;
  padding-top: 19px;
  padding-bottom: 21px;
  border-top: 1px solid lightgray;
`;

const Time = styled.div`
  width: 100%;
  padding-top: 19px;
  padding-bottom: 21px;
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
`;

const TimeSelect = ({ASAP}) => {
if (ASAP){
  return (
  <div>
    <Day>Today</Day>
    <Time>As Soon as possible mins</Time>
  </div>)
}
else {
  return (
    <div>
      <Day>Sometime later dropdown</Day>
      <Time>Dropdown</Time>
    </div>)
}
}

export default TimeSelect;