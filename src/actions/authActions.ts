import * as _ from 'lodash';
import * as types from './actionTypes';
import axios from 'axios';

import * as layoutActions from './layoutActions';
import * as loaderActions from './loaderActions';

const loginSuccess = (user) => {
    return { type: types.LOGIN_SUCCESS, user };
};

const loginError = () => {
    return { type: types.LOGIN_FAILURE };
};

export const fetchAccessToken = (code: string, state: string) => {
    const params = {
        code: code
    };
    const query = Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');
    return (dispatch) => {
        dispatch(loaderActions.startCall());
        return axios.get(`/accesstoken?${query}`)
            .then((response) => {
                dispatch(loginSuccess(response.data));
                dispatch(loaderActions.callSuccess());
            }).catch((error) => {
                dispatch(loginError());
                dispatch(loaderActions.callFailure());
            });
    };
};


