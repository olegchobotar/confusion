import * as ActionTypes from '../actions/types';
import { baseUrl } from '../shared/baseUrl';

export default () => dispatch => {
    dispatch(leadersLoading);

    return fetch(`${baseUrl}/leaders`)
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
        .then(leaders => dispatch(addLeaders(leaders)))
        .catch(error => dispatch(leadersFailed(error.message)));
}

const leadersLoading = ({
   type: ActionTypes.LEADERS_LOADING,
});

const leadersFailed = message => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: message,
})

const addLeaders = promotions => ({
    type: ActionTypes.ADD_LEADERS,
    payload: promotions,
});
