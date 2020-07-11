import * as ActionTypes from '../actions/types';

const defaultState = {
    isLoading: true,
    errMess: null,
    dishes: [],
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.ADD_DISHES:
            return {...state, isLoading: false, errMess: null, dishes: action.payload};
        case ActionTypes.DISHES_LOADING:
            return {...state, isLoading: true, errMess: null, dishes: []}
        case ActionTypes.DISHES_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        default:
            return state;
    }
}
