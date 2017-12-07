import * as types from '../actions/actionTypes';
import initialState from './initialState';

const currentBranchReducer = (state = initialState.currentBranch, action) => {
    switch (action.type) {
        case types.UPDATE_CURRENT_BRANCH:
            return action.branch;

        default:
            return state;
    }
};

export default currentBranchReducer;
