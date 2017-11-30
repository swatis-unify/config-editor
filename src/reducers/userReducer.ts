import * as _ from 'lodash';

import * as types from '../actions/actionTypes';
import initialState from './initialState';

const userReducer = (state = initialState.loggedInUser, action) => {
    switch (action.type) {
        case types.LOGIN_SUCCESS:
            return _.assign(action.token, state);
        case types.LOGIN_FAILURE:
            return {};
        case types.UPDATE_USER:
            return _.assign(action.user, state);

        default:
            return state;
    }
};

export default userReducer;
