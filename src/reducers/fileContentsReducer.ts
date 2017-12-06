import * as _ from 'lodash';

import * as types from '../actions/actionTypes';
import initialState from './initialState';

const fileContentsReducer = (state = initialState.selectedFile, action) => {
    switch (action.type) {
        case types.GET_FILE_CONTENTS:
            {
                return {
                    filePath: action.filePath,
                    contents: action.contents,
                    sha: action.sha
                };
            }
        case types.UPDATE_FILE_CONTENTS: {
            return {
                filePath: action.filePath,
                contents: action.contents,
                sha: action.sha
            };
        }
        default:
            return state;
    }
};

export default fileContentsReducer;
