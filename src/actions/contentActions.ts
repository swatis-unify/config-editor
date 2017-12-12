import * as _ from 'lodash';
import * as types from './actionTypes';
import axios from 'axios';

import * as layoutActions from './layoutActions';
import * as loaderActions from './loaderActions';
import * as failureActions from './errorStatusActions';

interface IFile {
    feed_name?: string;
    data_partner_name?: string;
    type: string;
    name: string;
    path: string;
    sha: string;
    size: number;
    download_url?: string;
    git_url: string;
    html_url: string;
    url: string;
    _links: any;
}

export const fetchFilesFailure = () => {
    return { type: types.FETCH_FILES_FAILURE };
};

export const fetchFeedsSuccess = (feeds) => {
    return { type: types.FETCH_FEEDS_SUCCESS, feeds };
};

export const fetchConfigsSuccess = (configs) => {
    return { type: types.FETCH_CONFIGS_SUCCESS, configs };
};

const createFeeds = (contents) => {
    const feeds = _.map(contents, (content: IFile) => {
        // derive feed name and data partner name from file name
        const fileInfo = content.name.split('_');
        const data_partner_name = fileInfo[0];
        const feed_name = fileInfo[1].split('.')[0];
        content.feed_name = feed_name;
        content.data_partner_name = data_partner_name;
        return content;
    });

    return { feeds };
};

export const setBranch = (branch: string) => {
    return { type: types.UPDATE_CURRENT_BRANCH, branch };
};

const updateBranches = (branches) => {
    return { type: types.UPDATE_BRANCHES, branches };
};

export const fetchBranches = () => {
    return (dispatch) => {
        dispatch(loaderActions.startCall());
        return axios.get('/branches')
            .then((response) => {
                dispatch(updateBranches({ branches: response.data }));
                dispatch(loaderActions.callSuccess());
            }).catch((error) => {
                dispatch(failureActions.apiFailed(error.request.status));
                dispatch(loaderActions.callFailure());
            });
    };
};

const loadConfig = (config) => {
    return { type: types.LOAD_CONFIG, config };
};

export const fetchContents = (branch) => {
    return (dispatch) => {
        dispatch(loaderActions.startCall());
        return axios.get('/contents', { params: { branch } })
            .then((response) => {
                const info = createFeeds(response.data);
                dispatch(fetchFeedsSuccess(info.feeds));
                dispatch(loaderActions.callSuccess());
            }).catch((error) => {
                dispatch(failureActions.apiFailed(error.request.status));
                dispatch(loaderActions.callFailure());
            });
    };
};

export const fetchConfig = (feed: any, branch: string) => {
    const filePath = feed.path;
    return (dispatch) => {
        dispatch(loaderActions.startCall());
        return axios.get('/config', { params: { filePath, branch } })
            .then((response) => {
                const { path, sha } = response.data;
                let content = window.atob(response.data.content);
                // remove trailing commas, JSON.parse fails to parse
                // reference - https://stackoverflow.com/questions/34344328/json-remove-trailiing-comma-from-last-object
                const regex = /\,(?=\s*?[\}\]])/g;
                content = content.replace(regex, ''); // remove all trailing commas
                dispatch(loadConfig({ config: JSON.parse(content), path, sha }));
                dispatch(loaderActions.callSuccess());
            }).catch((error) => {
                dispatch(failureActions.apiFailed(error.request.status));
                dispatch(loaderActions.callFailure());
            });
    };
};

export const updateFilter = (filter: { filter_name: string, params: any }) => {
    return { type: types.UPDATE_FILTER, filter };
};

export const addFilter = (filter: { filter_name: string, params: any }) => {
    return { type: types.ADD_FILTER, filter };
};

export const resetConfig = () => {
    return { type: types.RESET_CONFIG };
};

export const pushConfig = (branch: string, config: { config: any; sha: string, path: string }) => {
    const contents = window.btoa(JSON.stringify(config.config, null, 4));
    const { path, sha } = config;

    return (dispatch) => {
        dispatch(loaderActions.startCall());
        return axios
            .post('/pushChanges', { path, contents, sha, branch })
            .then((response) => {
                dispatch(loaderActions.callSuccess());
            })
            .catch(error => {
                dispatch(loaderActions.callFailure());
            });
    };
};
