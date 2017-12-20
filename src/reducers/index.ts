import { combineReducers } from 'redux';
import businessRules from './businessRulesReducer';
import isDrawerOpen from './drawerReducer';
import callsInProgress from './callsReducer';
import authFailureStatus from './authFailureStatusReducer';
import apiFailureStatus from './apiFailureStatusReducer';
import currentConfig from './configReducer';
import configs from '../configs/configsReducers';
import branches from '../branches/branchesReducer';
import currentBranch from '../branches/currentBranchReducer';
import accessToken from '../login/loginReducer';
import currentRoute from '../app/routingReducer';

const rootReducer = combineReducers({
    businessRules,
    isDrawerOpen,
    currentRoute,
    accessToken,
    callsInProgress,
    currentConfig,
    authFailureStatus,
    apiFailureStatus,
    configs,
    branches,
    currentBranch
});

export default rootReducer;
