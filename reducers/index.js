import { combineReducers } from 'redux';
import dishes from './dishes';
import comments from './comments';
import promotions from './promotions';
import leaders from './leaders';

export default combineReducers({
    dishes,
    comments,
    promotions,
    leaders,
});