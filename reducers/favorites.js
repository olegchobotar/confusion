import * as ActionTypes from '../actions/types';

const defaultState = [];

export default (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.ADD_FAVORITE:
            if (state.some(item => item === action.payload)) {
                return state;
            } else {
                return state.concat(action.payload)
            }
        default:
            return state;
    }
}