import React from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';
import MoreInfo from './MoreInfo.jsx';
import ScheduleDelivery from './ScheduleDelivery.jsx';

const fetch = require('node-fetch');

const MainBar = styled.div`
@media screen and (min-width: 1060px){
  max-width: 1024px;
  margin: 0 auto;
  box-sizing: content-box;
  padding-bottom: 80px;
}`;

// will most likely need to change MainBar to a flexbox to make it work with other components
const RestaurantDes = styled.h2`
    font: Helvetica Neue;
    font-size: 14px;
    letter-spacing: 0.20px;
    font-weight: 400;
    line-height: normal;
    color: rgb(143, 149, 163);
    padding: 0px;
    margin: 0px 0px 10px 0px;
`;

const MoreInfoButton = styled.button`
  align-items: center;
  outline: none;
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
`;
const MoreInfoButtonAni = styled.button`
  align-items: center;
  outline: none;
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
  `;

const RestaurantName = styled.h1`
  font: Helvetica;
  font-size: 38px;
  letter-spacing: -2.4px;
  font-weight: 600;
  line-height: normal;
  margin: 0px 0px 0px 0px;
`;
const MapIcon = styled.span`
  background: url(images/map.svg) no-repeat left center;
  padding-left: 12px;
`;

const TimeIcon = styled.span`
  background: url(images/time.svg) no-repeat left center;
  padding-left: 15px;
`;
const MoreInfoIcon = styled.span`
  background: url(images/down-chevron.svg) no-repeat right center;
  padding-right: 15px;
`;
// used with reactModal npm module.  Need to refactor to create modal without module.
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

class MainInfoBar extends React.Component {
  constructor() {
    super();
    this.state = {
      name: 'Restaurant',
      address: 'address',
      description: '',
      location: [], // LAT and LONG cords
      estDelivery: '', // Number from 0-60
      hours: [], // array of Objects, properties = day, open, close
      moreInfoOpen: false, // if more info div renders
      scheduleInfoOpen: false, // if schedule info div renders
    };
    this.toggleSchedule = this.toggleSchedule.bind(this); // required for setState to function while modal is open.
  }

  componentDidMount() {
    const id = window.location.pathname.split('/')[1];
    fetch(`/api/restaurant/${id}`)
      .then(res => res.json())
      .then((data) => {
        const {
          name, address, hours, location, description, estDelivery,
        } = data[0];
        this.setState({
          name, address, location, hours, description, estDelivery,
        });
      });
  }

  // Toggles the More info window that opens More Info Component
  toggleHide() {
    this.setState(prevState => ({
      moreInfoOpen: !prevState.moreInfoOpen,
    }));
  }

  // Toggles for the button that opens the ReactModule that contains schedule component
  toggleSchedule() {
    this.setState(prevState => ({
      scheduleInfoOpen: !prevState.scheduleInfoOpen,
    }));
  }

  render() {
    // destructuring all of the state information
    const {
      name, address, hours, location, scheduleInfoOpen, moreInfoOpen, description, estDelivery,
    } = this.state;
    return (
    <MainBar>
      <RestaurantName>{name}</RestaurantName>
      <RestaurantDes>{description}</RestaurantDes>
      <div>
      <MoreInfoButton onClick={this.toggleSchedule}>
        <TimeIcon>{estDelivery}-{estDelivery + 15} MIN</TimeIcon>
      </MoreInfoButton>
      <ReactModal style={customStyles} isOpen={scheduleInfoOpen} onRequestClose={this.toggleSchedule}>
              <ScheduleDelivery />
      </ReactModal>
      <MoreInfoButton onClick={() => this.toggleHide()}>
        <MapIcon>{address}</MapIcon>
      </MoreInfoButton>
      <MoreInfoButtonAni onClick={() => this.toggleHide()}>
        <MoreInfoIcon>More Info</MoreInfoIcon>
      </ MoreInfoButtonAni>
      </div>
      <MoreInfo storeInformation={this.state}/>
    </MainBar>);
    }
}

export default MainInfoBar;
