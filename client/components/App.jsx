import React from 'react';
import ReactModal from 'react-modal';
import MoreInfo from './MoreInfo.jsx'
import styled from 'styled-components'

const RestaurantDes = styled.h2`
    font: Helvetica Neue;
    font-size: 14px;
    letter-spacing: 0.14px;
    font-weight: 400;
    line-height: normal;
    color: rgb(143, 149, 163);
    padding: 0px;
    margin: 0px 0px 10px 0px;
`

const MoreInfoButton = styled.button`
  focus: {outline:0};
  align-items: center;
  height: 32px;
  background-color: rgb(255, 255, 255);
  text-transform: uppercase;
  border-radius: 16px;
  border-width: 1px;
  border-style: solid;
  border-color: rbg(217, 219, 224, 0.5);
  &:hover {
    background-color: gray;
  }
`
const MoreInfoButtonAni = styled.button`
  focus {outline:0;}
  align-items: center;
  height: 32px;
  background-color: rgb(255, 255, 255);
  text-transform: uppercase;
  border-radius: 16px;
  border-width: 1px;
  border-style: solid;
  border-color: rbg(217, 219, 224, 0.5);

  &:hover {
    background-color: gray;
  }
  `

const RestaurantName = styled.h1`
  font: Helvetica;
  font-size: 38px;
  letter-spacing: -2.4px;
  font-weight: 600;
  line-height: normal;
  margin: 0px 0px 0px 0px;
`

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      name:'Restaurant Name',
      address: '',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      location: [],
      hours: [],
      moreInfoOpen: true,
      scheduleInfoOpen: false
    }
    this.toggleSchedule = this.toggleSchedule.bind(this); //required for setState to function while modal is open.
  }

  componentDidMount(){
    console.log('mounted')
    let id = window.location.pathname.split('/')[1];
    fetch(`/api/${id}`)
    .then(res =>{ return res.json(); })
    .then(data =>{
      let { name, address, hours, location} = data[0];
      this.setState({name, address, location, hours})
    })
  }

  //Toggles the More info window that opens More Info Component
  toggleHide(){
    this.setState((prevState) => ({
      moreInfoOpen: !prevState.moreInfoOpen
    }));
  }

  //Toggles for the button that opens the ReactModule that contains schedule component
  toggleSchedule(){
    this.setState((prevState) => ({
      scheduleInfoOpen: !prevState.scheduleInfoOpen
    }));
  }

  render(){
    let { name, address, hours, location, scheduleInfoOpen, moreInfoOpen, description} = this.state;
    return (
    <div>
      <RestaurantName>{name}</RestaurantName>
      <RestaurantDes>{description}</RestaurantDes>
      <button onClick={this.toggleSchedule}>Estimated Delivery Time goes here</button>
      <ReactModal isOpen={scheduleInfoOpen} onRequestClose={this.toggleSchedule}>
              <div>This is where the schedule component would go</div>
      </ReactModal>
      <MoreInfoButton onClick={()=> this.toggleHide()}><span>{address}</span></MoreInfoButton>
      <MoreInfoButtonAni onClick={()=> this.toggleHide()}><span>More Info</span><span> ^ </span> </ MoreInfoButtonAni>
      <MoreInfo moreInfoOpen={moreInfoOpen}/>
    </div>);
  }
}

export default App;