import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, Image } from 'react-native';
import { Input, Icon, CheckBox, Button } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { createBottomTabNavigator } from 'react-navigation';
import { baseUrl } from "../shared/baseUrl";
import { Asset } from 'expo-asset';
import * as ImageManipulator from "expo-image-manipulator";

const LoginTab = props => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);

    const handleLogin = () => {
      console.log('username', username);
      console.log('password', password);
      console.log('remember', remember);

      if (remember) {
          SecureStore.setItemAsync(
              'userInfo',
              JSON.stringify({ username, password })
          )
              .catch(error => console.log('Could not save user info', error));
      } else {
          SecureStore.deleteItemAsync('userInfo')
              .catch(error => console.log('Could not delete user info', error));
      }
    };

    useEffect(() => {
        SecureStore.getItemAsync('userInfo')
            .then(userData => {
                let userInfo = JSON.parse(userData);
                if (userInfo) {
                    setUsername(userInfo.username);
                    setPassword(userInfo.password);
                    setRemember(true);
                }
            })
    }, {});


    return (
        <View style={styles.container}>
            <Input
                placeholder="Username"
                leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                onChangeText={username => setUsername(username)}
                value={username}
                containerStyle={styles.formInput}
            />
            <Input
                placeholder="Password"
                leftIcon={{ type: 'font-awesome', name: 'key' }}
                onChangeText={password => setPassword(password)}
                value={password}
                containerStyle={styles.formInput}
            />
            <CheckBox
                title="Remember Me"
                checked={remember}
                center
                onPress={() => setRemember(!remember)}
                containerStyle={styles.formCheckbox}
            />
            <View style={styles.formButton}>
                <Button
                    onPress={handleLogin}
                    icon={
                        <Icon
                            name="sign-in"
                            type="font-awesome"
                            size={24}
                            color="white"
                        />
                    }
                    title="Login"
                    buttonStyle={{ backgroundColor: '#512DA8' }}
                />
            </View>
            <View style={styles.formButton}>
                <Button
                    onPress={() => props.navigation.navigate('Register')}
                    icon={
                        <Icon
                            name="user-plus"
                            type="font-awesome"
                            size={24}
                            color="blue"
                        />
                    }
                    title="Register"
                    clear
                    titleStyle={{ color: 'blue' }}
                />
            </View>
        </View>
    );
};

LoginTab.navigationOptions = {
    title: 'Login',
    tabBarIcon: ({ tintColor }) => (
        <Icon
            name="sign-in"
            type="font-awesome"
            size={24}
            iconStyle={{ color: tintColor }}
        />
    )
};

const RegisterTab = props => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [remember, setRemember] = useState(false);
    const [imageUrl, setImageUrl] = useState(`${baseUrl}/logo.png`);

    const getImageFromCamera = async () => {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') {
            let capturedImage = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
            });
            if (!capturedImage.cancelled) {
                console.log(capturedImage);
                processImage(capturedImage.uri);
            }
        }
    };

    const getImageFromGallery = async () => {
        let capturedImage = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });
        if (!capturedImage.cancelled) {
            console.log(capturedImage);
            processImage(capturedImage.uri);
        }
    };


    const handleRegister = () => {
        console.log(username);
        console.log(password);
        console.log(firstName);
        console.log(lastName);
        console.log(email);
        if (remember) {
            SecureStore.setItemAsync(
                'userInfo',
                JSON.stringify({ username, password })
            )
                .catch(error => console.log('Could not save user info', error));
        }
    };

    const processImage = async (imageUri) => {
        let processedImage = await ImageManipulator.manipulate(
            imageUri,
            [
                {resize: {width: 400}}
            ],
            {format: 'png'}
        );
        console.log(processedImage);
        setImageUrl(processedImage.uri);
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: imageUrl }}
                        loadingIndicatorSource={require('./assets/logo.png')}
                        style={styles.image}
                    />
                    <Button
                        title="Camera"
                        onPress={getImageFromCamera}
                    />
                    <Button
                        title="Gallery"
                        onPress={getImageFromGallery}
                    />
                </View>
                <Input
                    placeholder="Username"
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={username => setUsername(username)}
                    value={username}
                    containerStyle={styles.formInput}
                />
                <Input
                    placeholder="Password"
                    leftIcon={{ type: 'font-awesome', name: 'key' }}
                    onChangeText={password => setPassword(password)}
                    value={password}
                    containerStyle={styles.formInput}
                />
                <Input
                    placeholder="First Name"
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={firstName => setFirstName(firstName)}
                    value={firstName}
                    containerStyle={styles.formInput}
                />
                <Input
                    placeholder="Last Name"
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={lastName => setLastName(lastName)}
                    value={lastName}
                    containerStyle={styles.formInput}
                />
                <Input
                    placeholder="Email"
                    leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
                    onChangeText={email => setEmail(email)}
                    value={email}
                    containerStyle={styles.formInput}
                />
                <CheckBox
                    title="Remember Me"
                    checked={remember}
                    center
                    onPress={() => setRemember(!remember)}
                    containerStyle={styles.formCheckbox}
                />
                <View style={styles.formButton}>
                    <Button
                        onPress={handleRegister}
                        icon={
                            <Icon
                                name="user-plus"
                                type="font-awesome"
                                size={24}
                                color="white"
                            />
                        }
                        title="Register"
                        buttonStyle={{ backgroundColor: '#512DA8' }}
                    />
                </View>
            </View>
        </ScrollView>
    );

};

RegisterTab.navigationOptions = {
    title: 'Register',
    tabBarIcon: ({ tintColor }) => (
        <Icon
            name="user-plus"
            type="font-awesome"
            size={24}
            iconStyle={{ color: tintColor }}
        />
    )
};

const Login = createBottomTabNavigator({
    Login: LoginTab,
    Register: RegisterTab,
}, {
    tabBarOptions: {
        activeBackgroundColor: '#9575CD',
        inactiveBackgroundColor: '#D1C4E9',
        activeTintColor: 'white',
        inactiveTintColor: 'gray',
    }
});

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20,
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 20,
    },
    image: {
        margin: 10,
        width: 80,
        height: 60,
    },
    formInput: {
        margin: 20,
    },
    formCheckbox: {
        margin: 20,
        backgroundColor: null,
    },
    formButton: {
        margin: 60,
    },
});

export default Login;
