import * as _ from 'lodash';
import * as types from './actionTypes';
import axios from 'axios';

import * as layoutActions from './layoutActions';
import * as loaderActions from './loaderActions';

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

const createFeedsAndConfigs = (contents) => {
    const configs = _.map(contents, (content: any) => {
        content.id = _.uniqueId();
        return content;
    });

    const feeds = _.map(configs, (config: { id: number, filters: { filter_name: string, params: any }[] }) => {
        const filter: any = _.find(config.filters, { filter_name: 'get_configurations' }) || {};

        return { configuration_id: config.id, ...filter.params.common };
    });

    return { feeds, configs };
};

const updateBranches = (branches) => {
    return { type: types.UPDATE_BRANCHES, branches };
};

export const fetchBranches = () => {
    return (dispatch) => {
        dispatch(loaderActions.startCall());
        return axios.get('/branches')
            .then((response) => {
                console.log('success: ', response);
                dispatch(updateBranches({ branches: response.data }));
                dispatch(loaderActions.callSuccess());
            }).catch((error) => {
                // user not logged in
                if (error.request.status === 401) {
                    dispatch(layoutActions.setRoute('/login'));
                    dispatch(loaderActions.callFailure());
                } else {
                    dispatch(loaderActions.callFailure());
                }
            });
    };
};

const updateConfig = (config) => {
    return { type: types.UPDATE_CONFIG, config };
};

export const fetchContents = (branch) => {
    return (dispatch) => {
        dispatch(loaderActions.startCall());
        return axios.get('/contents', { params: { branch } })
            .then((response) => {
                const info = createFeeds(response.data);
                dispatch(fetchFeedsSuccess(info.feeds));
                // dispatch(fetchConfigsSuccess(info.configs));
                dispatch(loaderActions.callSuccess());
            }).catch((error) => {
                dispatch(fetchFilesFailure());
                dispatch(loaderActions.callFailure());
                // user not logged in
                // if (error.request.status === 401) {
                //     dispatch(layoutActions.setRoute('/login'));
                // } else {
                //     dispatch((fetchFilesFailure()));
                // }
            });
    };
};

export const fetchConfig = (feed: any) => {
    const feedUrl = feed.download_url;
    return (dispatch) => {
        dispatch(loaderActions.startCall());
        return axios.get('/config', { params: { url: feedUrl } })
            .then((response) => {
                console.log('success: ', response);
                dispatch(updateConfig({ fileName: feed.name, config: response.data }));
                dispatch(loaderActions.callSuccess());
            }).catch((error) => {
                // user not logged in
                if (error.request.status === 401) {
                    dispatch(layoutActions.setRoute('/login'));
                    dispatch(loaderActions.callFailure());
                } else {
                    dispatch(loaderActions.callFailure());
                }
            });
    };
};
