import React, { useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';

const Item = props => {
    const { item } = props;
    if (item !== null) {
      return (
          <Card
              featuredTitle={item.name}
              featuredSubtitle={item.designation}
              image={require('./assets/uthappizza.png')}
          >
              <Text style={{ margin: 10 }}>{item.description}</Text>
          </Card>
      );
    } else {
        return <View></View>;
    }
};

const Home = props => {
    const [dishes] = useState(DISHES);
    const [promotions] = useState(PROMOTIONS);
    const [leaders] = useState(LEADERS);

    return (
        <ScrollView>
           <Item item={getOnlyFeatured(dishes)} />
           <Item item={getOnlyFeatured(promotions)} />
           <Item item={getOnlyFeatured(leaders)} />
        </ScrollView>
    )
};

Home.navigationOptions = {
    title: 'Home'
};

const getOnlyFeatured = items => items.find(item => item.featured);

export default Home;
