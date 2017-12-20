import * as _ from 'lodash';

import * as types from './routingActionTypes';
import initialState from '../reducers/initialState';

const routeReducer = (state = initialState.currentRoute, action) => {
    switch (action.type) {
        case types.CHANGE_ROUTE:
            return action.currentRoute;

        default:
            return state;
    }
};

export default routeReducer;
