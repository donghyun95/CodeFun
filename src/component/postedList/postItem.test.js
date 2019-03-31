import React from 'react';
import { shallow } from 'enzyme';
import PostItem from'./postItem';

describe('PostItem', () => {
    let component = null;

    it('renders without crashing', () => {
        component = shallow(<PostItem/>);
    });

    it('matches snapshot', () => {
        expect(component).toMatchSnapshot();
    });

    it('has starColor2 className and number', () => {
        component.setState({
            isStared: true,
            starNum: 1
        });
        expect(component.find('.starColor2').exists()).toBe(true);
        expect(component.find('.starNum').text()).toBe('1');
    });
});
