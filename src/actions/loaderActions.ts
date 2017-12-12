import * as types from './actionTypes';

export const startCall = () => {
    return { type: types.CALL_START };
};

export const callSuccess = () => {
    return { type: types.CALL_SUCCESS };
};

export const callFailure = () => {
    return { type: types.CALL_FAILURE };
};
