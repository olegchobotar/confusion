import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { DISHES } from '../shared/dishes';

const DishDetail = props => {
    const { navigation } = props;
    const [dishes] = useState(DISHES);
    const dishId = navigation.getParam('dishId', '');
    const currentDish = dishes.find(dish => dish.id === dishId);

    if (currentDish) {
        return (
            <Card
                featuredTitle={currentDish.name}
                image={require('./assets/uthappizza.png')}
            >
                <Text style={{ margin: 10 }}>
                    {currentDish.description}
                </Text>
            </Card>
        );
    } else {
        return( <View></View>)
    }
};

DishDetail.navigationOptions = {
    title: 'Dish Details',
};

export default DishDetail;
