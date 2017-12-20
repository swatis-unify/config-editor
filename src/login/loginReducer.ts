import * as types from './loginActionTypes';
import initialState from '../reducers/initialState';

const loginReducer = (state = initialState.loggedInUser, action) => {
    switch (action.type) {
        case types.FETCH_ACCESS_TOKEN_SUCCESS:
            return action.user;

        default:
            return state;
    }
};

export default loginReducer;