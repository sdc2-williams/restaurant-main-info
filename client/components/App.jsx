import React from 'react';
import ReactModal from 'react-modal';
import MoreInfo from './MoreInfo.jsx'

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      name:'Restaurant Name',
      address: '',
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
    let { name, address, hours, location, scheduleInfoOpen, moreInfoOpen} = this.state;
    return (
    <div>
      <h1>{name}</h1>
      <button onClick={this.toggleSchedule}>Estimated Delivery Time goes here</button>
      <ReactModal isOpen={scheduleInfoOpen} onRequestClose={this.toggleSchedule}>
              <div>This is where the schedule component would go</div>
      </ReactModal>
      <button onClick={()=> this.toggleHide()}>{address}</button>
      <button onClick={()=> this.toggleHide()}>More Info</button>
      <MoreInfo moreInfoOpen={moreInfoOpen}/>
    </div>);
  }
}

export default App;