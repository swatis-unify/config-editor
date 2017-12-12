import * as types from '../actions/actionTypes';
import initialState from './initialState';

import * as _ from 'lodash';

const configReducer = (state = initialState.currentConfig, action) => {
    switch (action.type) {
        case types.LOAD_CONFIG:
            return action.config;

        case types.RESET_CONFIG:
            return _.assign({}, initialState.currentConfig);

        case types.UPDATE_FILTER:
            const filters = _.assign([], state.config.filters);
            const index = _.findIndex(filters, { filter_name: action.filter.filter_name });
            filters[index] = action.filter;
            return _.assign({}, state, { config: { filters } });

        default:
            return state;
    }
};

export default configReducer;
