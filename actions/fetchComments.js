import * as ActionTypes from '../actions/types';
import { baseUrl } from '../shared/baseUrl';
import { COMMENTS } from "../shared/comments";

export default () => dispatch => {
    dispatch(addComments(COMMENTS));
}
// export default () => dispatch =>
//     fetch(`${baseUrl}/comments`)
//         .then(response => {
//             if (response.ok) {
//                 return response;
//             } else {
//                 const error = new Error(`Error ${response.status}: ${response.statusText}`);
//                 error.responses = response;
//                 throw error;
//             }
//         },
//         error => {
//             throw new Error(error.message);
//         })
//         .then(response => response.json())
//         .then(comments => dispatch(addComments(comments)))
//         .catch(error => dispatch(commentsFailed(error.message)));

const addComments = comments => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments,
});

const commentsFailed = message => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: message,
})

