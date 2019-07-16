import React from 'react';
import styled from 'styled-components';
import TimeSelect from './TimeSelect.jsx';

const FlexBox = styled.div`
  display: flex;
`;

const ASAPButton = styled.button`
  cursor: pointer;
  flex: 1;
  text-align: center;
  background-color: rgb(255, 255, 255);
  font: Helvetica;
  font-weight: 600;
  text-transform: uppercase;
  line-height: normal;
  color: rgb(45, 49, 56);
  font-size: 13px;
  border-style: none none solid;
  outline: none;
  border-radius: 0px;
  border-bottom: ${props => props.ASAP === true ? `3px solid rgb(0, 204, 153)`: "white"};
  `

const ScheduleButton = styled.button`
  cursor: pointer;
  flex: 1;
  text-align: center;
  background-color: rgb(255, 255, 255);
  font: Helvetica;
  font-weight: 600;
  text-transform: uppercase;
  line-height: normal;
  color: rgb(45, 49, 56);
  font-size: 13px;
  border-style: none none solid;
  outline: none;
  border-radius: 0px;
  border-bottom: ${props => !props.ASAP === true ? `3px solid rgb(0, 204, 153)`: "white"};
`;


const DeliveryTime = styled.button`
  display: block;
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;
  outline: none;
  text-align: center;
  height: 40px;
  background-color: rgb(0, 204, 153);
  color: rgb(255, 255, 255);
  font: Helvetica;
  font-size: 14px;
  text-transform: uppercase;
  line-height: normal;
  border-radius: 50px;
  margin-top: 20px
  padding-right: 50px;
  padding-left: 50px;
`;

class ScheduleDelivery extends React.Component{
  constructor(props){
    super()
    this.state = {
      ASAP: true,
    }
  }

  onClickASAP (){
    this.setState({
      ASAP: true,
    });
    console.log('asap')
  }

  onClickSchedule (){
    this.setState({
      ASAP: false,
    })
    console.log('schedule')
  }

  render(){
    let { ASAP } = this.state;
    return (
    <div>
      <div>
      <h3>Select Delivery Time</h3>
      </div>
      <FlexBox>
        <ASAPButton ASAP={ASAP} onClick={()=> this.onClickASAP()}>ASAP</ASAPButton>
        <ScheduleButton ASAP={ASAP} onClick={()=> this.onClickSchedule()}>Schedule</ScheduleButton>
      </FlexBox>
        <TimeSelect ASAP={ASAP}/>
      <DeliveryTime>SET DELIVERY TIME</DeliveryTime>
    </div>)
  }
}

export default ScheduleDelivery;