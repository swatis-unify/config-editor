import axios from 'axios';
import * as types from './loginActionTypes';

const setUserInfo = (user) => {
    return { type: types.FETCH_ACCESS_TOKEN_SUCCESS, user };
};

export const fetchAccessToken = (code: string, state: string) => {
    const params = { code, state };
    return (dispatch) => {
        // dispatch(loaderActions.startCall());
        return axios.get(`/accesstoken`, { params })
            .then((response) => {
                dispatch(setUserInfo(response.data));
                // dispatch(loaderActions.callSuccess());
            }).catch((error) => {
                // dispatch(failureActions.authFailed(error.request.status));
                // dispatch(loaderActions.callFailure());
            });
    };
};
