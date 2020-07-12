import * as ActionTypes from '../actions/types';

export default dishId => ({
    type: ActionTypes.DELETE_FAVORITE,
    payload: dishId,
})
