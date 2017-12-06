import { combineReducers } from 'redux';
import businessRules from './businessRulesReducer';
import isDrawerOpen from './drawerReducer';
import currentRoute from './routeReducer';
import loggedInUser from './userReducer';
import files from './filesReducer';
import fileContents from './fileContentsReducer';

const rootReducer = combineReducers({
    businessRules,
    isDrawerOpen,
    currentRoute,
    loggedInUser,
    files,
    fileContents 
});

export default rootReducer;
