import axios from 'axios';
import * as _ from 'lodash';
import Config, { IConfig } from './config';
import * as actionTypes from './configActionTypes';

const fetchConfigSuccess = (configs) => {
    return { type: actionTypes.FETCH_CONFIGS_SUCCESS, configs };
};

export const fetchConfigs = (branch) => {
    return (dispatch) => {
        return axios.get('/configs', { params: { branch } })
            .then((response) => {
                const configs = _.map(response.data, (config: IConfig) => new Config(config));
                dispatch(fetchConfigSuccess(configs));
                // const info = createFeeds(response.data);
                // dispatch(fetchFeedsSuccess(info.feeds));
                // dispatch(loaderActions.callSuccess());
            }).catch((error) => {
                // dispatch(failureActions.apiFailed(error.request.status));
                // dispatch(loaderActions.callFailure());
            });
    };
};