import * as types from '../actions/actionTypes';
import initialState from './initialState';

const apiFailureStatusReducer = (state = initialState.apiFailureCode, action) => {
    switch (action.type) {
        case types.API_FAILED:
            return action.statusCode;

        case types.RESET_API_FAILURE_STATUS:
            return null;

        default:
            return state;
    }
};

export default apiFailureStatusReducer;
