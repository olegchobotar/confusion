import * as ActionTypes from '../actions/types';

export default dishId => dispatch => {
    setTimeout(() => {
        dispatch(addFavorite(dishId))
    }, 2000);
}

const addFavorite = dishId => ({
    type: ActionTypes.ADD_FAVORITE,
    payload: dishId,
});
