import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import Modal from './CommonComponent/Modal/Modal';
describe('App', () => {
  let component = null;
  it('renders without crashing', () => {
    component = shallow(<App projectUserId="donggri" Title="No Title"/>);
  });
  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('if given Modal props , has a Modalcomponent', () => {
    component.setProps({
      isModalOpen: true
    });
    expect(component.find(Modal).exists()).toBe(true);
    expect(component).toMatchSnapshot();
  });
});

