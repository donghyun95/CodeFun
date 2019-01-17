import React from 'react';
import { shallow } from 'enzyme';
import {FeatureList} from './FeatureList';

describe('FeatureList', () => {
    let component = null;
    it('renders without crashing', () => {
        component = shallow(<FeatureList USER={false} projectOwner={true} isLogin={false}/>);
    });

    it('matches snapshot', () => {
        expect(component).toMatchSnapshot();
    });

    it('has a loginIcon', () => {
        expect(component.find('[to="/login"]').exists()).toBe(true);
    });


    describe('LoggedIn but No projectOwner', () => {
        let component = shallow(<FeatureList USER={false} projectOwner={true} isLogin={true}/>);
        
        it('has no loginIcon', () => {
            expect(component.find('[to="/login"]').exists()).toBe(false);
        });

        it('has 5 component', () => {
            expect(component.find('.FeatureList_Box').length).toBe(5);
        });

    });

    describe('LoggedIn And projectOwner', () => {
        let component = shallow(<FeatureList USER={true} projectOwner={true} isLogin={true}/>);

        it('has no loginIcon', () => {
            expect(component.find('[to="/login"]').exists()).toBe(false);
        });

        it('has 6 FeatuerList component', () => {
            expect(component.find('.FeatureList_Box').length).toBe(6);
        });

        it('matches snapshot', () => {
            expect(component).toMatchSnapshot();
        });
    });
});