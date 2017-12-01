import { combineReducers } from 'redux';
import businessRules from './businessRulesReducer';
import isDrawerOpen from './drawerReducer';
import currentRoute from './routeReducer';
import loggedInUser from './userReducer';
import files from './filesReducer';

const rootReducer = combineReducers({
    businessRules,
    isDrawerOpen,
    currentRoute,
    loggedInUser,
    files
});

export default rootReducer;
