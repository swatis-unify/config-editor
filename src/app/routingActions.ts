import * as _ from 'lodash';
import * as types from './routingActionTypes';

import routes from '../routes';

// To-Do - swati build a layout actions
// export const toggleLeftDrawer = () => {
//     return { type: types.TOGGLE_LEFT_DRAWER };
// };

export const setRoute = (currentRoute, data: any = {}) => {
    if (_.isString(currentRoute)) {
        // ability to change route sppecifying only the path
        currentRoute = _.find(routes, { path: currentRoute });
        if (_.values(data)) {
            currentRoute.data = data;
        }
    }
    return { type: types.CHANGE_ROUTE, currentRoute };
};
