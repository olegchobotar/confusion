import React, { useState } from 'react';
import {
    Text,
    View,
    ScrollView,
    Picker,
    Switch,
    StyleSheet,
    Button,
    Modal
} from 'react-native';
import DatePicker from 'react-native-datepicker';

const Reservation = props => {
    const [guests, setGuests] = useState(1);
    const [smoking, setSmoking] = useState(false);
    const [date, setDate] = useState('');
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const resetForm = () => {
        setGuests(1);
        setSmoking(false);
        setDate('');
    };

    const handleReservation = () => {
        console.log('guests', guests);
        console.log('smoking', smoking);
        console.log('date', date);

        toggleModal();
    };

    return (
        <ScrollView>
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
            <Modal
                animationType="slide"
                transparent={false}
                visible={showModal}
                onDismiss={() => {toggleModal(); resetForm()}}
                onRequestClose={() => {toggleModal(); resetForm()}}
            >
                <View style={styles.modal}>
                    <Text style={styles.modalTitle}>Your Reservation</Text>
                    <Text style={styles.modalText}>Number of guests: {guests}</Text>
                    <Text style={styles.modalText}>Smoking? : {smoking ? 'Yes' : 'No'}</Text>
                    <Text style={styles.modalText}>Date and Time: {date}</Text>
                    <Button
                        onPress={() => {toggleModal(); resetForm()}}
                        color="#512DA8"
                        title="Close"
                    />
                </View>
            </Modal>
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
