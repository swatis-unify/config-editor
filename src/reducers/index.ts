import { combineReducers } from 'redux';
import businessRules from './businessRulesReducer';
import isDrawerOpen from './drawerReducer';
import currentRoute from './routeReducer';
import loggedInUser from './userReducer';

const rootReducer = combineReducers({
    businessRules,
    isDrawerOpen,
    currentRoute,
    loggedInUser
});

export default rootReducer;
