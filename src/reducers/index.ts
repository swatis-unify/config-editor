import { combineReducers } from 'redux';
import businessRules from './businessRulesReducer';
import isDrawerOpen from './drawerReducer';
import currentRoute from './routeReducer';
import loggedInUser from './userReducer';
import feeds from './feedsReducer';
import callsInProgress from './callsReducer';

const rootReducer = combineReducers({
    businessRules,
    isDrawerOpen,
    currentRoute,
    loggedInUser,
    feeds,
    callsInProgress
});

export default rootReducer;
