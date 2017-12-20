import * as types from './branchActionTypes';
import initialState from '../reducers/initialState';

const branchesReducer = (state = initialState.branches, action) => {
    switch (action.type) {
        case types.FETCH_BRANCHES_SUCCESS:
            return action.branches;

        default:
            return state;
    }
};

export default branchesReducer;
