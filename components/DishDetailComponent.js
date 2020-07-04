import React, { useState } from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';

const DishDetail = props => {
    const { navigation } = props;
    const [dishes] = useState(DISHES);
    const [comments] = useState(COMMENTS);
    const [favorites, setFavorites] = useState([]);
    const dishId = navigation.getParam('dishId', '');
    const currentDish = dishes.find(dish => dish.id === dishId);

    const markFavorite = dishId => {
        setFavorites([
            ...favorites,
            dishId,
        ])
    };

    if (currentDish) {
        const isFavorite = favorites.some(item => item === dishId);
        return (
            <ScrollView>
                <Card
                    featuredTitle={currentDish.name}
                    image={require('./assets/uthappizza.png')}
                >
                    <Text style={{ margin: 10 }}>
                        {currentDish.description}
                    </Text>
                    <Icon
                        raised={true}
                        reverse={true}
                        name={isFavorite ? 'heart' : 'heart-o'}
                        type="font-awesome"
                        color="#f50"
                        onPress={() => isFavorite ? console.log('Already favorite') : markFavorite(dishId)}
                    />
                </Card>
                <Comments comments={comments.filter(comment => comment.dishId === dishId)} />
            </ScrollView>
        );
    } else {
        return( <View></View>)
    }
};

const Comments = props => {
    const { comments } = props;

    const renderItem = ({ item, index }) => (
        <View key={index} style={{ margin: 10 }}>
            <Text style={{ fontSize: 14 }}>{item.comment}</Text>
            <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text>
            <Text style={{ fontSize: 12 }}>{`-- ${item.author}, ${item.date}`}</Text>
        </View>
    )

    return (
        <Card title="Comments">
            <FlatList
                data={comments}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
        </Card>
    )
}

DishDetail.navigationOptions = {
    title: 'Dish Details',
};

export default DishDetail;
