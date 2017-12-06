import * as _ from 'lodash';

import * as types from '../actions/actionTypes';
import initialState from './initialState';

const feedsReducer = (state = initialState.feeds, action) => {
    switch (action.type) {
        case types.FETCH_FEEDS_SUCCESS:
            return action.feeds;

        default:
            return state;
    }
};

export default feedsReducer;
