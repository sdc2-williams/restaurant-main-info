import React from 'react';
import MoreInfo from './MoreInfo.jsx'

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      name:'test',
      location: '',
      currentLocation: '',
      moreInfoHidden: true
    }
  }

  toggleHide(){
    this.setState((prevState) => ({
      moreInfoHidden: !prevState.moreInfoHidden
    }));
  }

  render(){
    return (
    <div>
      <h1>{this.state.name}</h1>
      <button onClick={()=> this.toggleHide()}>More Info</button>
      <MoreInfo moreInfoHidden={this.state.moreInfoHidden}/>
    </div>);
  }
}

export default App;