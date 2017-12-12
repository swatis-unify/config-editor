import * as types from '../actions/actionTypes';
import initialState from './initialState';

import * as _ from 'lodash';

const configReducer = (state = initialState.currentConfig, action) => {
    let filters = [];
    let index = -1;
    switch (action.type) {
        case types.LOAD_CONFIG:
            return action.config;

        case types.RESET_CONFIG:
            return _.assign({}, initialState.currentConfig);

        case types.UPDATE_FILTER:
            filters = _.assign([], state.config.filters);
            index = _.findIndex(filters, { filter_name: action.filter.filter_name });
            filters[index] = action.filter;
            return _.assign({}, state, { config: { filters } });

        case types.ADD_FILTER:
            return _.assign({}, state, { config: { filters: state.config.filters.concat([action.filter]) } });

        default:
            return state;
    }
};

export default configReducer;
