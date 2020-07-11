import * as ActionTypes from '../actions/types';

export default (dishId, rating, author, comment) => (dispatch, getState) => {
    const allComments = getState().comments.comments;
    const id = allComments ? +allComments.pop().id + 1 : 0;
    setTimeout(() => {
        dispatch(addComment({
            id,
            dishId,
            rating,
            author,
            comment,
            date: new Date().toISOString(),
        }))
    }, 2000);
}

const addComment = comment => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment,
});
