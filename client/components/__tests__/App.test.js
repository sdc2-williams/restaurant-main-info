import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import MoreInfo from '../MoreInfo';

describe('Main bar component renders', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });
});

// describe('More info window renders', () => {
//   it('renders without crashing', () => {
//     shallow(<MoreInfo />);
//   });
// });
