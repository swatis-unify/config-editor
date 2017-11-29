import * as _ from 'lodash';

import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function businessRulesReducer(state = initialState.businessRules, action) {
    switch (action.type) {
        case types.FETCH_BUSINESS_RULES_SUCCESS:
            return _.assign({}, action.businessRules);

        default:
            return state;
    }
}
