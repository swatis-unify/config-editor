import * as _ from 'lodash';

import * as types from '../actions/actionTypes';
import initialState from './initialState';

const userReducer = (state = initialState.loggedInUser, action) => {
    switch (action.type) {
        case types.LOGIN_SUCCESS:
            return action.token;
        case types.LOGIN_FAILURE:
            return {};

        default:
            return state;
    }
};

export default userReducer;
