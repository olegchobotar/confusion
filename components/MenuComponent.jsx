import React from 'react';
import {FlatList, Text, View} from 'react-native';
import { Tile } from 'react-native-elements';
import { baseUrl } from '../shared/baseUrl';
import { connect } from 'react-redux';
import Loading from './LoadingComponent';

const Menu = props => {
    const { navigation: { navigate }, dishes } = props;

    const renderMenuItem = ({ item, index }) => {
        return (
            <Tile
                key={index}
                title={item.name}
                caption={item.description}
                featured
                onPress={() => navigate('DishDetail', { dishId: item.id })}
                imageSrc={{ uri: `${baseUrl}/${item.image}` }}
            />
        );
    };

    if (dishes.isLoading) {
        return <Loading />
    } else if (dishes.errMess) {
        return (
            <View>
                <Text>{dishes.errMess}</Text>
            </View>
        )
    }

    return (
        <FlatList
            data={dishes.dishes}
            renderItem={renderMenuItem}
            keyExtractor={item => item.id.toString()}
        />
    )
};

Menu.navigationOptions = {
    title: 'Menu'
};

const mapStateToProps = state => ({
    dishes: state.dishes,
});

export default connect(mapStateToProps)(Menu);
