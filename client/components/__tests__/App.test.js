import React from 'react';
import { shallow } from 'enzyme';
import MainInfoBar from '../MainInfoBar';
import MoreInfo from '../MoreInfo';

describe('Main bar component renders', () => {
  it('renders without crashing', () => {
    shallow(<MainInfoBar />);
  });
});

// describe('More info window renders', () => {
//   it('renders without crashing', () => {
//     shallow(<MoreInfo />);
//   });
// });
