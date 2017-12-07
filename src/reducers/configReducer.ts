import * as types from '../actions/actionTypes';
import initialState from './initialState';

const configReducer = (state = initialState.currentConfig, action) => {
    switch (action.type) {
        case types.UPDATE_CONFIG:
            return action.config;

        default:
            return state;
    }
};

export default configReducer;
