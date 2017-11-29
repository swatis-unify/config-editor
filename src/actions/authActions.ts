import * as _ from 'lodash';
import * as types from './actionTypes';
import axios from 'axios';

import authConfig from './authConfig';

const loginSuccess = (token) => {
    return { type: types.LOGIN_SUCCESS, token };
};

const loginError = () => {
    return { type: types.LOGIN_FAILURE };
};

export const fetchAccessToken = (code: string, state: string) => {
    const params = {
        client_id: authConfig.clientId,
        client_secret: authConfig.clientSecret,
        code: code
    };
    const query = Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');
    return (dispatch) => {
        return axios({
            method: 'post',
            url: `https://github.com/login/oauth/access_token?${query}`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            console.log('success: ', response);
            dispatch(loginSuccess(response.data));
        }).catch((error) => {

            console.log('Error: ', error);
            dispatch(loginError());
        });
        // return axios.post('https://github.com/login/oauth/access_token', {
        //     client_id: authConfig.clientId,
        //     client_secret: authConfig.clientSecret,
        //     code: code,
        //     state: authConfig.state,
        //     redirect_uri: authConfig.redirectUri
        // })
    };
};
