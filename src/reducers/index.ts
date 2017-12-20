import { combineReducers } from 'redux';
import businessRules from './businessRulesReducer';
import isDrawerOpen from './drawerReducer';
import currentRoute from './routeReducer';
import loggedInUser from './userReducer';
import feeds from './feedsReducer';
import callsInProgress from './callsReducer';
import currentBranch from './currentBranchReducer';
import authFailureStatus from './authFailureStatusReducer';
import apiFailureStatus from './apiFailureStatusReducer';
import currentConfig from './configReducer';
import configs from '../configs/configsReducers';

const rootReducer = combineReducers({
    businessRules,
    isDrawerOpen,
    currentRoute,
    loggedInUser,
    feeds,
    callsInProgress,
    currentBranch,
    currentConfig,
    authFailureStatus,
    apiFailureStatus,
    configs
});

export default rootReducer;
