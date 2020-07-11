import * as ActionTypes from '../actions/types';
import { baseUrl } from '../shared/baseUrl';
import { DISHES } from "../shared/dishes";

export default () => dispatch => {
    // dispatch(dishesLoading);
    dispatch(addDishes(DISHES));
    return;

    return fetch(`${baseUrl}/dishes`)
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.responses = response;
                    throw error;
                }
            },
            error => {
                throw new Error(error.message);
            })
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)));
}

const dishesLoading = ({
   type: ActionTypes.DISHES_LOADING
});

const dishesFailed = message => ({
    type: ActionTypes.DISHES_FAILED,
    payload: message,
})

const addDishes = dishes => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes,
});
