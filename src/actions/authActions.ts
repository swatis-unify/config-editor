import * as _ from 'lodash';
import * as types from './actionTypes';
import axios from 'axios';

import * as layoutActions from './layoutActions';
import authConfig from './authConfig';

const loginSuccess = (user) => {
    return { type: types.LOGIN_SUCCESS, user };
};

const loginError = () => {
    return { type: types.LOGIN_FAILURE };
};

const updateBranches = (branches) => {
    return { type: types.UPDATE_BRANCHES, branches };
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
                dispatch(loginSuccess(response.data));
                dispatch(fetchBranches());
            }).catch((error) => {
                dispatch(loginError());
            });
    };
};

export const fetchBranches = () => {
    return (dispatch) => {
        return axios.get('/branches')
            .then((response) => {
                console.log('success: ', response);
                dispatch(updateBranches({ branches: response.data }));
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
