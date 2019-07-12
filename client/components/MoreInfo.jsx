import React from 'react';
import key from '../../config.js'

class MoreInfo extends React.Component{
  constructor(props){
    super(props)
    let {address, hours, location, moreInfoOpen} = this.props.storeInformation;
  }


  componentDidMount(){
    console.log('More Info Mounted')
  }

  render() {
    let {address, hours, location, moreInfoOpen} = this.props.storeInformation;
    //if the moreinfo state is True, the moreInfo component will render
    if (moreInfoOpen){
      return (
        <div>
          <table>
            <thead></thead>
            <tbody>
            {hours.map(day => {
              return (
              <tr key={day._id}>
                <td>{day.day}</td>
                <td>{day.open}-{day.close}</td>
              </tr>)
            })}
            </tbody>
          </table>
          <div>
            <iframe src={`https://www.google.com/maps/embed/v1/place?key=${key.key}
    &q=Space+Needle,Seattle+WA`}></iframe>
          </div>
        </div>
      );
    } else {
      return (
        <div></div>
      );
    }
  }
}









export default MoreInfo;