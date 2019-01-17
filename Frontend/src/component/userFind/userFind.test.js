import React from "react";
import { shallow, } from "enzyme";
import {userFind as UserFind} from "./userFind";
import ProjectItem from './proejectItem';
import Modal from '../../CommonComponent/Modal/Modal';

const firstData = {
    "createDate": "2019-01-14T08:45:43.952Z",
    "stars": [],
    "_id": "5c3c4c38a15a21061c50d818",
    "content": {
        "Title": "No Title",
        "userId": "t99480",
        "Htmlvalue": "testTest",
        "Cssvalue": "",
        "Jsvalue": "",
        "Modal": {
            "isModalOpen": false,
            "childComponent": null
        },
        "LibraryList": [],
        "UpdateNumber": 0,
        "AutoRunCheck": true,
        "LibIdNum": 0,
        "pending": false,
        "error": false,
        "ProjectId": null
    }
}
const secondData = {
    "createDate": "2019-01-14T09:00:21.256Z",
    "stars": [],
    "_id": "5c3c4fa87805780017566687",
    "content": {
        "Title": "Test",
        "userId": "t99480",
        "Htmlvalue": "Test2 Test2",
        "Cssvalue": "",
        "Jsvalue": "",
        "Modal": {
            "isModalOpen": false,
            "childComponent": null
        },
        "LibraryList": [],
        "UpdateNumber": 0,
        "AutoRunCheck": true,
        "LibIdNum": 0,
        "pending": false,
        "error": false,
        "ProjectId": null
    }
};
const dataSet = [firstData,secondData];
const userFindprototypeMethods = {
    handleRemove : jest.spyOn(UserFind.prototype,"handleRemove"),
    handlehistoryBack : jest.spyOn(UserFind.prototype,"handlehistoryBack")
};
const userFindDefaultProps = {
    LogInuser : null,
    isModalOpen : false,
    match: {
        params: {
            userId : "Test"
        }
    },
    history: {
        goBack : () => null
    }
};
describe('userFind Component', () => {
    let component = null;

    it('renders without crashing', () => {
        component = shallow(<UserFind {...userFindDefaultProps}/>);
        expect(component).toMatchSnapshot();
    });

    it('should have 2 projectItem Component', () => {
        component.setState({
            ProjectList : dataSet
        });
        expect(component.find(ProjectItem).length).toBe(2);
    });

    it('should Call handleRemove', () => {
        expect(userFindprototypeMethods.handleRemove).toHaveBeenCalledTimes(2);
    });

    it('should not render Modal', () => {
        expect(component.find(Modal).exists()).toBe(false);
    });

    it('should render Modal ', () => {
        component.setProps({isModalOpen: true});
        expect(component.find(Modal).exists()).toBe(true);
    });

    it('render usernameProject', () => {
        expect(component.find('.userFind__container__userName > div').text()).toBe('Test ProjectList');
    });

    it('should Call Back function', () => {
        component.find('.backBtn').simulate('click');
        expect(userFindprototypeMethods.handlehistoryBack).toHaveBeenCalled();
    }); 
});