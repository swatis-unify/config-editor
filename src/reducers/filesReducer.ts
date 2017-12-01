import * as _ from 'lodash';

import * as types from '../actions/actionTypes';
import initialState from './initialState';

const filesReducer = (state = initialState.files, action) => {
    switch (action.type) {
        case types.FETCH_FILES_SUCCESS:
            return action.files;

        default:
            return state;
    }
};

export default filesReducer;
