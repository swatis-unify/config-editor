import * as _ from 'lodash';
import * as types from './actionTypes';

import routes from '../routes';

export const toggleLeftDrawer = () => {
    return { type: types.TOGGLE_LEFT_DRAWER };
};

export const setRoute = (currentRoute) => {
    if (_.isString(currentRoute)) {
        // ability to change route sppecifying only the path
        currentRoute = _.find(routes, { path: currentRoute });
    }
    return { type: types.CHANGE_ROUTE, currentRoute };
};
