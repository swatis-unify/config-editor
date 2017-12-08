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

const updateUser = (user) => {
    return { type: types.UPDATE_USER, user };
};

export const logout = () => {
    return (dispatch) => {
        dispatch(loaderActions.startCall());
        return axios.post(`/logout`)
            .then((response) => {
                dispatch(updateUser(response.data));
                dispatch(loaderActions.callSuccess());
            }).catch((error) => {
                dispatch(failureActions.authFailed(error.request.status));
                dispatch(loaderActions.callFailure());
            });
    };
};

export const fetchUser = () => {
    return (dispatch) => {
        dispatch(loaderActions.startCall());
        return axios.get(`/user`)
            .then((response) => {
                dispatch(updateUser(response.data));
                if (response.data.loggedIn) {
                    dispatch(layoutActions.setRoute('/home'));
                } else {
                    dispatch(layoutActions.setRoute('/login'));
                }
                dispatch(loaderActions.callSuccess());
            }).catch((error) => {
                dispatch(failureActions.authFailed(error.request.status));
                dispatch(loaderActions.callFailure());
            });
    };
};



