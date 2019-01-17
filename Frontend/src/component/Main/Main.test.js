import React from "react";
import { shallow } from "enzyme";
import Main from './Main';

const prototypeMethods = {
    heigthResizeStart : jest.spyOn(Main.prototype,"heigthResizeStart"),
    HeightControll : jest.spyOn(Main.prototype,"HeightControll"),
    handleHeightResizable : jest.spyOn(Main.prototype, "handleHeightResizable"),
}
describe('Main Component', () => {
    let component = null;
    it('renders without crashing', () => {
        component = shallow(<Main/>);
        expect(component).toMatchSnapshot();
    });

    it('should render Iframe', () => {
        expect(component.find('.IfrContainer').exists()).toBe(true);
    });

    it('should render Spinner', () => {
        component.setState({hidden: true});
        expect(component.find('.IframeSpinner').exists()).toBe(true);
    });

    it('should Call MouseDownEvent', () => {
        component.setState({hidden: false});
        const mockEventObj = {
            preventDefault : () => null,
            stopPropagation : () => null
        }
        component.find('.heightResizable').simulate('mousedown',mockEventObj);
        expect(prototypeMethods.handleHeightResizable).toHaveBeenCalled();
        expect(prototypeMethods.heigthResizeStart).toHaveBeenCalledWith(component.instance().HeightControll);
        expect(component.state().hidden).toBe(true);
    });
});