import routes from '../routes';
import * as _ from 'lodash';

const startupPath = window.location.pathname;
const initialRoute = _.find(routes, { path: startupPath });

export default {
    businessRules: [],
    isDrawerOpen: false,
    currentRoute: initialRoute,
    loggedInUser: {},
    files: []
};
