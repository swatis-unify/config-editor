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

export const getFileContentsSuccess = (filePath, fileContents, sha) => {
    return { type: types.GET_FILE_CONTENTS, filePath: filePath, contents: fileContents, sha: sha };
};

export const updateFileContentSuccess = (filePath, updatedContents, sha) => {
    return { type: types.UPDATE_FILE_CONTENTS, filePath: filePath, contents: updatedContents, sha: sha };
}

export const getFileContents = (filePath) => {

    return (dispatch) => {
        return axios
            .get('/fileContents', { params: { filePath } })
            .then((response) => {
                var fileContents = atob(response.data.content);
                dispatch(getFileContentsSuccess(filePath, fileContents, response.data.sha));
            });
    }

};

export const updateFileContents = (filePath, updatedContents, sha) => {
    const contents = window.btoa(updatedContents);

    return (dispatch) => {
        return axios
            .post('/fileContents', { filePath, contents, sha })
            .then((response) => {
                dispatch(updateFileContentSuccess(filePath, updatedContents, sha));
            });
    };

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
