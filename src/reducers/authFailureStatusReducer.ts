import * as types from '../actions/actionTypes';
import initialState from './initialState';

const authFailureStatusReducer = (state = initialState.authFailureCode, action) => {
    switch (action.type) {
        case types.AUTH_FAILED:
            return action.statusCode;

        case types.RESET_AUTH_FAILURE_STATUS:
            return null;

        default:
            return state;
    }
};

export default authFailureStatusReducer;
