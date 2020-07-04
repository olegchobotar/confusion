import * as ActionTypes from '../actions/types';
import { baseUrl } from '../shared/baseUrl';

export default () => dispatch => {
    dispatch(promotionsLoading);

    return fetch(`${baseUrl}/promotions`)
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
        .then(promotions => dispatch(addPromotions(promotions)))
        .catch(error => dispatch(promotionsFailed(error.message)));
}

const promotionsLoading = ({
   type: ActionTypes.PROMOTIONS_LOADING,
});

const promotionsFailed = message => ({
    type: ActionTypes.PROMOTIONS_FAILED,
    payload: message,
})

const addPromotions = promotions => ({
    type: ActionTypes.ADD_PROMOTIONS,
    payload: promotions,
});
