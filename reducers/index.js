import { persistCombineReducers } from 'redux-persist';
import dishes from './dishes';
import comments from './comments';
import promotions from './promotions';
import leaders from './leaders';
import favorites from './favorites';
import AsyncStorage from '@react-native-community/async-storage';

const config = {
    key: 'root',
    storage: AsyncStorage,
    debug: true,
};

export default persistCombineReducers(config,{
    dishes,
    comments,
    promotions,
    leaders,
    favorites,
});
