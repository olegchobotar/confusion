import React from 'react';
import {ScrollView, Text} from 'react-native';
import { Card } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

const ContactItem = props => <Text style={{ margin: 10 }}>{props.text}</Text>;

const Contact = () => (
    <ScrollView>
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
            <Card title="Contact information">
                <ContactItem text="121, Clear Water Bay Road"/>
                <ContactItem text="Clear Water Bay, Kowloon"/>
                <ContactItem text="HONG KONG"/>
                <ContactItem text="Tel: +852 1234 5678"/>
                <ContactItem text="Tel: +852 1234 5678"/>
                <ContactItem text="Tel: +852 1234 5678"/>
            </Card>
        </Animatable.View>

    </ScrollView>
);

Contact.navigationOptions = {
    title: 'Contact Us'
};

export default Contact;
