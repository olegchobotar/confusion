import React, { useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { baseUrl } from '../shared/baseUrl';
import { connect } from 'react-redux';

const Item = props => {
    const { item } = props;
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

    return (
        <ScrollView>
           <Item item={getOnlyFeatured(dishes.dishes)} />
           <Item item={getOnlyFeatured(promotions.promotions)} />
           <Item item={getOnlyFeatured(leaders.leaders)} />
        </ScrollView>
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
