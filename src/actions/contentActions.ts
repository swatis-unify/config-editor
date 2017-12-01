import * as _ from 'lodash';
import * as types from './actionTypes';
import axios from 'axios';

import * as layoutActions from './layoutActions';

export const fetchFilesSuccess = (files) => {
    return { type: types.FETCH_FILES_SUCCESS, files };
};

export const fetchFilesFailure = () => {
    return { type: types.FETCH_FILES_FAILURE };
};

export const fetchContents = (branch) => {
    return (dispatch) => {
        return axios.get('/contents', { params: { branch } })
            .then((response) => {
                console.log('success: ', response);
                dispatch(fetchFilesSuccess({ files: response.data }));
            }).catch((error) => {
                dispatch(fetchFilesFailure());
                // user not logged in
                // if (error.request.status === 401) {
                //     dispatch(layoutActions.setRoute('/login'));
                // } else {
                //     dispatch((fetchFilesFailure()));
                // }
            });
    };
};
