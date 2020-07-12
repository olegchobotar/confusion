import React, { useState, useEffect } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import { Card } from 'react-native-elements';
import { baseUrl } from '../shared/baseUrl';
import { connect } from 'react-redux';
import Loading from './LoadingComponent';

const Item = props => {
    const { item } = props;

    if (props.isLoading) {
        return <Loading />
    } else if (props.errMess) {
        return (
            <View>
                <Text>{props.errMess}</Text>
            </View>
        )
    }

    if (item) {
      return (
          <Card
              featuredTitle={item.name}
              featuredSubtitle={item.designation}
              image={{ uri: `${baseUrl}/${item.image}` }}
          >
              <Text style={{ margin: 10 }}>{item.description}</Text>
          </Card>
      );
    } else {
        return <View></View>;
    }
};

const Home = props => {
    const { dishes, promotions, leaders } = props;
    const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));

    useEffect(() => {
        animate();
    }, []);

    const animate = () => {
        animatedValue.setValue(0);
        Animated.timing(animatedValue, {
            toValue: 8,
            duration: 8000,
            easing: Easing.linear,
        }).start(animate);
    };

    const xPos1 = animatedValue.interpolate({
        inputRange: [0, 1, 3, 5, 8],
        outputRange: [1200, 600, 0, -600, -1200],
    });

    const xPos2 = animatedValue.interpolate({
        inputRange: [0, 2, 4, 6, 8],
        outputRange: [1200, 600, 0, -600, -1200],
    });

    const xPos3 = animatedValue.interpolate({
        inputRange: [0, 3, 5, 7, 8],
        outputRange: [1200, 600, 0, -600, -1200],
    });

    return (
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
            <Animated.View style={{ width: '100%', transform: [{ translateX: xPos1 }] }}>
                <Item item={getOnlyFeatured(dishes.dishes)} isLoading={dishes.isLoading} errMess={dishes.errMess} />
            </Animated.View>
            <Animated.View style={{ width: '100%', transform: [{ translateX: xPos2 }] }}>
                <Item item={getOnlyFeatured(promotions.promotions)} isLoading={promotions.isLoading} errMess={promotions.errMess} />
            </Animated.View>
            <Animated.View style={{ width: '100%', transform: [{ translateX: xPos3 }] }}>
                <Item item={getOnlyFeatured(leaders.leaders)} isLoading={leaders.isLoading} errMess={leaders.errMess} />
            </Animated.View>

        </View>
    )
};

Home.navigationOptions = {
    title: 'Home'
};

const getOnlyFeatured = items => items.find(item => item.featured);

const mapStateToProps = state => ({
    dishes: state.dishes,
    promotions: state.promotions,
    leaders: state.leaders,
});

export default connect(mapStateToProps)(Home);
