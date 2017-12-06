import * as _ from 'lodash';

import * as types from '../actions/actionTypes';
import initialState from './initialState';

const callsReducer = (state = initialState.callsInProgress, action) => {
    switch (action.type) {
        case types.CALL_START:
            return ++state;

        case types.CALL_SUCCESS:
            return --state;

        case types.CALL_FAILURE:
            return --state;

        default:
            return state;
    }
};

export default callsReducer;
