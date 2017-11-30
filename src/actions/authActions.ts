import * as _ from 'lodash';
import * as types from './actionTypes';
import axios from 'axios';

import * as layoutActions from './layoutActions';
import authConfig from './authConfig';

const loginSuccess = (token) => {
    return { type: types.LOGIN_SUCCESS, token };
};

const loginError = () => {
    return { type: types.LOGIN_FAILURE };
};

const updateUser = (user) => {
    return { type: types.UPDATE_USER, user };
};

export const fetchAccessToken = (code: string, state: string) => {
    const params = {
        code: code
    };
    const query = Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');
    return (dispatch) => {
        return axios.get(`/accesstoken?${query}`)
            .then((response) => {
                console.log('success: ', response);
                dispatch(loginSuccess(response.data));
                dispatch(fetchUser());
            }).catch((error) => {
                console.log('Error: ', error);
                dispatch(loginError());
            });
    };
};

export const fetchUser = () => {
    return (dispatch) => {
        return axios.get('/user')
            .then((response) => {
                console.log('success: ', response);
                dispatch(updateUser(response.data));
            }).catch((error) => {
                // user not logged in
                if (error.request.status === 401) {
                    dispatch(layoutActions.setRoute('/login'));
                } else {
                    dispatch(loginError());
                }
            });
    };
};
