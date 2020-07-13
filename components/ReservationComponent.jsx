import React, { useState } from 'react';
import {
    Text,
    View,
    ScrollView,
    Picker,
    Switch,
    StyleSheet,
    Button,
    Alert
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import * as Animatable from 'react-native-animatable';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import * as Calendar from 'expo-calendar';

const Reservation = props => {
    const [guests, setGuests] = useState(1);
    const [smoking, setSmoking] = useState(false);
    const [date, setDate] = useState('');

    const resetForm = () => {
        setGuests(1);
        setSmoking(false);
        setDate('');
    };

    const handleReservation = () => {
        Alert.alert(
            'Your reservation OK?',
            `Number of guests: ${guests}\nSmoking: ${smoking}\nDate and Time: ${date}`,
            [
                {
                    text: 'Cancel',
                    onPress: () => {
                        console.log(`Cancelled`);
                        resetForm();
                    },
                    style: ' cancel'
                },
                {
                    text: 'OK',
                    onPress: () => {
                        console.log('guests', guests);
                        console.log('smoking', smoking);
                        console.log('date', date);
                        presentLocalNotification(date);
                        addReservationToCalender();
                        resetForm();
                    },
                }
            ],
            { cancelable: false }
        )
    };

    const obtainCalendarPermission = async () => {
        let permission = await Permissions.getAsync(Permissions.CALENDAR);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.CALENDAR);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to calendar');
            }
        }
        return permission;
    };

    const addReservationToCalender = async () => {
        await obtainCalendarPermission();
        const newCalendarID = await Calendar.createCalendarAsync({
            title: 'Con Fusion Table Reservation',
            color: 'blue',
            entityType: Calendar.EntityTypes.EVENT,
            timeZone: 'Asia/Hong_Kong',
            startDate: new Date(Date.parse(date)),
            endDate: new Date(Date.parse(date) + 2 * 60 * 60 * 1000),
            location: '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong',
        });
        console.log(`Your new calendar ID is: ${newCalendarID}`);
    };


    const obtainNotificationPermission = async () => {
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to show notifications');
            }
        }
        return permission;
    };

    const presentLocalNotification = async () => {
        await obtainNotificationPermission();
        Notifications.presentNotificationAsync({
            title: 'Reservation',
            body: `Reservation for ${date} requested`,
            ios: {
                sound: true,
            },
            android: {
                sound: true,
                vibrate: true,
                color: '#512DA8',
            }
        })
    };

    return (
        <ScrollView>
            <Animatable.View animation="zoomIn" duration={2000}>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Number of Guests</Text>
                    <Picker
                        style={styles.formItem}
                        selectedValue={guests}
                        onValueChange={(itemValue, itemPosition) => setGuests(itemValue)}
                    >
                        <Picker.Item label="1" value="1" />
                        <Picker.Item label="2" value="2" />
                        <Picker.Item label="3" value="3" />
                        <Picker.Item label="4" value="4" />
                        <Picker.Item label="5" value="5" />
                        <Picker.Item label="6" value="6" />
                    </Picker>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Smoking / Non-Smoking?</Text>
                    <Switch
                        style={styles.formItem}
                        value={smoking}
                        onTintColor="#512DA8"
                        onValueChange={value => setSmoking(value)}
                    />
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Date and Time</Text>
                    <DatePicker
                        style={styles.datePicker}
                        date={date}
                        format=""
                        mode="datetime"
                        placeholder="select date and time"
                        minDate="2020-01-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0,
                            },
                            dateInput: {
                                marginLeft: 36,
                            },
                        }}
                        onDateChange={date => setDate(date)}
                    />
                </View>
                <View style={styles.formRow}>
                    <Button
                        title="Reserve"
                        color="#512DA8"
                        onPress={handleReservation}
                        accessibilityLabel="Learn more about this purple button"
                    />
                </View>
            </Animatable.View>
        </ScrollView>
    );
};

Reservation.navigationOptions = {
    title: 'Reserve Table',
};

const styles = StyleSheet.create({
   formRow: {
       alignItems: 'center',
       justifyContent: 'center',
       flex: 1,
       flexDirection: 'row',
       margin: 20,
   },
    formLabel: {
       fontSize: 18,
        flex: 2,
    },
    formItem: {
       flex: 1,
    },
    datePicker: {
       flex: 2,
        marginRight: 20,
   },
    modal: {
       justifyContent: 'center',
        margin: 20,
    },
    modalTitle: {
       fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20,
    },
    modalText: {
       fontSize: 18,
        margin: 10,
    },
});

export default Reservation;
