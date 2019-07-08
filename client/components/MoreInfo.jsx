import React from 'react';

const MoreInfo = ({moreInfoOpen}) => {
  if (!moreInfoOpen){
    return (
      <div>List of stuff...</div>
    );
  } else {
    return (
      <div></div>
    );
  }
}

export default MoreInfo;