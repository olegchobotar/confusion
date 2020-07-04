import React from 'react';
import {FlatList, ScrollView, Text} from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import Loading from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const AboutUs = props => {
    const { leaders } = props;

    const renderLeader = ({ item, index }) => {
        return (
            <ListItem
                key={index}
                title={item.name}
                subtitle={item.description}
                hideChevron={true}
                leftAvatar={{ source: { uri: `${baseUrl}/${item.image}` } }}
            />
        );
    };

    const history = (
        <Card title="Our history" >
            <Text style={{ margin: 10 }}>
                Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.
            </Text>
            <Text style={{ margin: 10 }}>
                The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.
            </Text>
        </Card>
    );

    if (leaders.isLoading) {
        return (
            <ScrollView>
                {history}
                <Card title="Corporate Leadership">
                   <Loading />
                </Card>
            </ScrollView>
        );
    } else if (leaders.errMess) {
        return (
            <ScrollView>
                {history}
                <Card title="Corporate Leadership">
                    <Text>{leaders.errMess}</Text>
                </Card>
            </ScrollView>
        );
    }

    return (
        <ScrollView>
            {history}
            <Card title="Corporate Leadership">
                <FlatList
                    data={leaders.leaders}
                    renderItem={renderLeader}
                    keyExtractor={item => item.id.toString()}
                />
            </Card>
        </ScrollView>
    );
};

AboutUs.navigationOptions = {
    title: 'About Us'
};

const mapStateToProps = state => ({
    leaders: state.leaders
});

export default connect(mapStateToProps)(AboutUs);
