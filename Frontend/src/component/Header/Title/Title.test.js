import React from "react";
import { shallow } from "enzyme";
import {index as Title} from './index';
import {Link} from "react-router-dom";

let defaultProps = {
    modifyTitle : jest.fn(),
    title: "No Title",
    userId: "None",
    LoginuserId: null,
}
const prototypeMethods = {
    decideTitle: jest.spyOn(Title.prototype, "decideTitle"),
    handleDocumentClick: jest.spyOn(Title.prototype, "handleDocumentClick"),
    convertInput : jest.spyOn(Title.prototype, "convertInput"),
    handleChangeEv :jest.spyOn(Title.prototype, "handleChangeEv"),
    handleKeyUpEv :jest.spyOn(Title.prototype, "handleKeyUpEv").mockImplementation(()=>"key up called")
  };


describe('Title', () => {
    let component = null;
    
    it("renders without crashing", () => {
        component = shallow(<Title {...defaultProps}/>);
        expect(component).toMatchSnapshot();
    });

    describe('with props', () => {
        
        component = shallow(<Title {...defaultProps}/>);
        
        it('when given default Props render Properly', () => {
            expect(component.find('.Title').exists()).toBe(true);
            expect(component.find('.Title > span').text()).toBe("No Title");
            expect(component.find('.UserId').exists()).toBe(true);
            expect(component.find(Link).exists()).toBe(true);
        });

        it('Event call',()=>{
            component.find('.Title').simulate('dblclick');
            component.instance().setState({
                status: true
            });
            expect(prototypeMethods.convertInput).toHaveBeenCalled();
            
            component.find('.TitleInput').simulate('change',{
                target: {
                    value: 'hello'
                }
            });
            expect(component.state().Titleinput).toBe('hello');
            expect(prototypeMethods.handleChangeEv).toHaveBeenCalled();

            component.find('.TitleInput').simulate('keyup');
            expect(prototypeMethods.handleKeyUpEv).toHaveBeenCalled();
            expect(prototypeMethods.handleKeyUpEv).toHaveReturnedWith("key up called");
        });
    });
});