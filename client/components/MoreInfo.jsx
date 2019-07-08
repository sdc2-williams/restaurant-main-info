import React from 'react';

const MoreInfo = ({moreInfoHidden}) => {
  if (moreInfoHidden){
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