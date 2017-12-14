import * as React from 'react';
import * as _ from 'lodash';
import * as sinon from 'sinon';
import { shallow } from 'enzyme';
import * as expect from 'expect';
import HomePage from '../../../src/components/home/homePage';

describe('Home Page', () => {
    let component: any;
    beforeEach(() => {
        component = shallow(<HomePage />);
    });

    it('homepage should present', () => {
        expect(component).toBeDefined();
    });
});
