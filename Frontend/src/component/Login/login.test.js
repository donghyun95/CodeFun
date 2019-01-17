import React from 'react';
import { shallow } from 'enzyme';
import {login as Login} from './login';

const prototypeMethods = {
    handleLoginSubmit : jest.spyOn(Login.prototype,'handleLoginSubmit'),
    handleRegisterSubmit: jest.spyOn(Login.prototype,'handleRegisterSubmit'),
    handleChange :  jest.spyOn(Login.prototype, 'handleChange'),
}

describe('Login', () => {
    let component = null;
    it('renders without crashing', () => {
        component = shallow(<Login></Login>);
    });
    it('matches snapshot Login', () => {
        expect(component).toMatchSnapshot();
    });

    it('render without crashing Login', () => {
        expect(component.find('.Card__top').text()).toBe('Login');
        expect(component.find('[to="/register"]').exists()).toBe(true);
    });
    it('renders without crashing Register', () => {
        component.setProps({register: true});
        expect(component.find('.Card__top').text()).toBe('Register');
        expect(component.find('[to="/login"]').exists()).toBe(true);
        expect(component).toMatchSnapshot();
    });

    it('renders loginFail', () => {
        component.setState({loginFail: true});
        expect(component.find('.loginFail').exists()).toBe(true);
    });

    it('renders Spninner when pending', () => {
        component.setProps({pending: true});
        expect(component.find('.LoginBody').exists()).toBe(false);
        expect(component.find('.SpinnerBox').exists()).toBe(true);
        expect(component).toMatchSnapshot();
    });
    
    describe('Event Call', () => {
        const defaultDispatchProps = {
            requestLogin : jest.fn().mockImplementation(() => Promise.resolve()),
            requestRegister: jest.fn(),
            history : {}
        };
        let component = shallow(<Login {...defaultDispatchProps} register={false}/>);
        
        it('Call SubmitEvent', () => {
            const mockEventObj = {
                preventDefault: () => null,
                target: {
                    ID:{value:"test"},
                    PassWord: {value: "testing"}
                }
            };
            component.find('.Card__form').simulate('submit',mockEventObj);
            expect(prototypeMethods.handleLoginSubmit).toHaveBeenCalled();
            expect(defaultDispatchProps.requestLogin).toHaveBeenCalledWith("test","testing");
        });

        it('Call inputChangeEvent', () => {
            const mockEventObj = {
                preventDefault: () => null,
                target: {
                    name: "ID",
                    value: "TEST"
                }
            };
            component.find('[name="ID"]').simulate('change',mockEventObj);
            expect(prototypeMethods.handleChange).toHaveBeenCalled();
            expect(component.state().ID).toBe('TEST');
        });
    });
});
