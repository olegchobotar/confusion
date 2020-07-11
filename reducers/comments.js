import * as ActionTypes from '../actions/types';

const defaultState = {
    errMess: null,
    comments: [],
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENTS:
            return {...state, errMess: null, comments: action.payload};
        case ActionTypes.ADD_COMMENT:
            return {
                ...state,
                comments: [
                    ...state.comments,
                    action.payload,
                ]
            };
        case ActionTypes.COMMENTS_FAILED:
            return {...state, errMess: action.payload};
        default:
            return state;
    }
}
