import * as _ from 'lodash';

import * as types from '../actions/actionTypes';
import initialState from './initialState';

const drawerReducer = (state = initialState.isDrawerOpen, action) => {
    switch (action.type) {
        case types.TOGGLE_LEFT_DRAWER:
            return !state;

        default:
            return state;
    }
};

export default drawerReducer;
