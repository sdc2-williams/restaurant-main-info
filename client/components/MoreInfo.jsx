import React from 'react';
import key from '../../config.js';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 30px 0px 0px 0px;
  border-top: 1px solid lightgray;
`
const HoursTable = styled.table`
  grid-column-start: 1;
  grid-column-end: 2;
`
const LocationMap = styled.div`
  grid-column-start: 2;
  grid-column-end: 3;
`


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
        <Wrapper>
          <HoursTable>
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
          </HoursTable>
          <LocationMap>
            <iframe src={`https://www.google.com/maps/embed/v1/place?key=${key.key}
    &q=Mcdonalds,sandiego+CA`} frameBorder="0"></iframe>
          </LocationMap>
        </Wrapper>
      );
    } else {
      return (
        <div></div>
      );
    }
  }
}









export default MoreInfo;