import * as _ from 'lodash';
import * as types from './actionTypes';
import axios from 'axios';

import * as layoutActions from './layoutActions';
import * as loaderActions from './loaderActions';
import * as failureActions from './errorStatusActions';

const loginSuccess = (user) => {
    return { type: types.LOGIN_SUCCESS, user };
};

const loginError = () => {
    return { type: types.LOGIN_FAILURE };
};

export const fetchAccessToken = (code: string, state: string) => {
    const params = { code, state };
    return (dispatch) => {
        dispatch(loaderActions.startCall());
        return axios.get(`/accesstoken`, { params })
            .then((response) => {
                dispatch(loginSuccess(response.data));
                dispatch(loaderActions.callSuccess());
            }).catch((error) => {
                dispatch(failureActions.authFailed(error.request.status));
                dispatch(loaderActions.callFailure());
            });
    };
};


