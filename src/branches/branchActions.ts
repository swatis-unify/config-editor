import * as types from './branchActionTypes';
import axios from 'axios';

export const setBranch = (branch: string) => {
    return { type: types.SET_CURRENT_BRANCH, branch };
};

const fetchBranchesSuccess = (branches) => {
    return { type: types.FETCH_BRANCHES_SUCCESS, branches };
};

export const fetchBranches = () => {
    return (dispatch) => {
        // dispatch(loaderActions.startCall());
        return axios.get('/branches')
            .then((response) => {
                dispatch(fetchBranchesSuccess(response.data));
                // dispatch(loaderActions.callSuccess());
            }).catch((error) => {
                // dispatch(failureActions.apiFailed(error.request.status));
                // dispatch(loaderActions.callFailure());
            });
    };
};