import React, {useState} from 'react';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { DISHES } from '../shared/dishes';

const Menu = props => {
    const { navigation: { navigate } } = props;
    const [dishes] = useState(DISHES);

    const renderMenuItem = ({ item, index }) => {
        return (
            <ListItem
                key={index}
                title={item.name}
                subtitle={item.description}
                hideChevron={true}
                onPress={() => navigate('DishDetail', { dishId: item.id })}
                leftAvatar={{ source: require('./assets/uthappizza.png') }}
            />
        );
    };

    return (
        <FlatList
            data={dishes}
            renderItem={renderMenuItem}
            keyExtractor={item => item.id.toString()}
        />
    )
};

Menu.navigationOptions = {
    title: 'Menu'
};

export default Menu;
