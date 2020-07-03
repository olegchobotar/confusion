import React from 'react';
import { Text } from 'react-native';
import { Card } from 'react-native-elements';

const ContactItem = props => <Text style={{ margin: 10 }}>{props.text}</Text>;

const Contact = () => (
    <Card title="Contact information">
        <ContactItem text="121, Clear Water Bay Road"/>
        <ContactItem text="Clear Water Bay, Kowloon"/>
        <ContactItem text="HONG KONG"/>
        <ContactItem text="Tel: +852 1234 5678"/>
        <ContactItem text="Tel: +852 1234 5678"/>
        <ContactItem text="Tel: +852 1234 5678"/>
    </Card>
);

Contact.navigationOptions = {
    title: 'Contact Us'
};

export default Contact;
