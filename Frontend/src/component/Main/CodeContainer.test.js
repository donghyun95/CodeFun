import React from "react";
import { shallow } from "enzyme";
import {CodeContainer} from './CodeContainer';
import CodeEditor from '../../CommonComponent/codeWrite/codeWrite';

const defaultProps = {
    Htmlvalue : 'htmlTest',
    Cssvalue : 'cssTest',
    Jsvalue : 'jsTest'
}

const prototypeMethods = {
    htmlwidthControll: jest.spyOn(CodeContainer.prototype,"htmlwidthControll").mockImplementation(()=>"called"),
    JSwidthControll: jest.spyOn(CodeContainer.prototype, "JSwidthControll").mockImplementation(()=>"called"),
    handleHtmlWebResizableDown: jest.spyOn(CodeContainer.prototype, "handleHtmlWebResizableDown").mockImplementation(()=>"called"),
    handleJsWebResizableDown: jest.spyOn(CodeContainer.prototype, "handleJsWebResizableDown").mockImplementation(()=>"called")
}

describe('CodeContainer', () => {
    let component = null;

    it('renders without crashing', () => {
        component = shallow(<CodeContainer {...defaultProps}/>);
        expect(component).toMatchSnapshot();
    });

    it('should have 3 CodeEditor', () => {
        expect(component.find(CodeEditor).length).toBe(3);        
    });

    it('should have 2 svgBox', () => {
        expect(component.find('.resizable_svgBox').length).toBe(2);
    });

    it('should have 2 resizable', () => {
        expect(component.find('.resizable').length).toBe(2);
    });

    it('should call resizableDown', () => {
        component.find('.resizable').at(0).simulate('mousedown');
        expect(prototypeMethods.handleHtmlWebResizableDown).toHaveBeenCalled();
        component.find('.resizable').at(1).simulate('mousedown');
        expect(prototypeMethods.handleJsWebResizableDown).toHaveBeenCalled();
    });

});