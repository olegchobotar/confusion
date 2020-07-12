import React from 'react';
import {FlatList, Text, View, Alert, ScrollView} from 'react-native';
import { ListItem } from 'react-native-elements';
import { baseUrl } from '../shared/baseUrl';
import { connect } from 'react-redux';
import Loading from './LoadingComponent';
import Swipeout from 'react-native-swipeout';
import * as Animatable from 'react-native-animatable';
import deleteFavorite from '../actions/deleteFavorite';

const Favorites = props => {
    const { navigation: { navigate }, dishes, favorites, deleteFavorite } = props;

    const renderMenuItem = ({ item, index }) => {
        const rightButton = [
            {
                text: 'Delete',
                type: 'delete',
                onPress: () => {
                    Alert.alert(
                        'Delete Favorite?',
                        `Are you sure you wish to delete the favorite dish ${item.name}?`,
                        [
                            {
                                text: 'Cancel',
                                onPress: () => console.log(`${item.name} Not Deleted`),
                                style: ' cancel'
                            },
                            {
                                text: 'OK',
                                onPress: () => deleteFavorite(item.id),
                            }
                        ],
                        { cancelable: false }
                    )
                },
            }
        ];

        return (
            <Swipeout right={rightButton} autoClose={true}>
                <Animatable.View animation="fadeInRightBig" duration={2000}>
                    <ListItem
                        key={index}
                        title={item.name}
                        subtitle={item.description}
                        hideChevron={true}
                        onPress={() => navigate('DishDetail', { dishId: item.id })}
                        leftAvatar={{ source: {uri: `${baseUrl}/${item.image}` }}}
                    />
                </Animatable.View>
            </Swipeout>
        );
    };
    
    if (dishes.loading) {
        return <Loading />;
    } else if (dishes.errMess) {
        return (
            <View>
                <Text>{dishes.errMess}</Text>
            </View>
        )
    }

    return (
        <FlatList
            data={dishes.dishes.filter(dish => favorites.some(item => item === dish.id))}
            renderItem={renderMenuItem}
            keyExtractor={item => item.id.toString()}
        />
    )
};

Favorites.navigationOptions = {
    title: 'My Favorites'
};

const mapStateToProps = state => ({
    dishes: state.dishes,
    favorites: state.favorites,
});

export default connect(
    mapStateToProps,
    { deleteFavorite },
)(Favorites);
