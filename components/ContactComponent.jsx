import React from 'react';
import {ScrollView, Text} from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';

const ContactItem = props => <Text style={{ margin: 10 }}>{props.text}</Text>;

const Contact = () => {

    const sendEmail = () => {
        MailComposer.composeAsync({
            recipients: ['confusion@food.net'],
            subject: 'Enquiry',
            body: 'To whom it may concern',
        })
    };

    return (
        <ScrollView>
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                <Card title="Contact information">
                    <ContactItem text="121, Clear Water Bay Road"/>
                    <ContactItem text="Clear Water Bay, Kowloon"/>
                    <ContactItem text="HONG KONG"/>
                    <ContactItem text="Tel: +852 1234 5678"/>
                    <ContactItem text="Tel: +852 1234 5678"/>
                    <ContactItem text="Tel: +852 1234 5678"/>
                    <Button
                        title="Send Email"
                        buttonStyle={{ backgroundColor: '#512DA8' }}
                        icon={<Icon name="envelope-o" type="font-awesome" color="white"/>}
                        onPress={sendEmail}
                    />
                </Card>
            </Animatable.View>

        </ScrollView>
    );
};

Contact.navigationOptions = {
    title: 'Contact Us'
};

export default Contact;
