import * as types from './configActionTypes';
import initialState from '../reducers/initialState';

const ConfigsReducer = (state = initialState.configs, action) => {
    switch (action.type) {
        case types.FETCH_CONFIGS_SUCCESS:
            return action.configs;

        default:
            return state;
    }
};

export default ConfigsReducer;
