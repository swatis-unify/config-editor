import * as types from './actionTypes';

export const apiFailed = (statusCode) => {
    return { type: types.API_FAILED, statusCode };
};

export const resetApiFailureStatus = () => {
    return { type: types.RESET_API_FAILURE_STATUS };
};

export const authFailed = (statusCode) => {
    return { type: types.AUTH_FAILED, statusCode };
};

export const resetAuthFailureStatus = () => {
    return { type: types.RESET_AUTH_FAILURE_STATUS };
};
