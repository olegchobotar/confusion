import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Card, Input, Icon, CheckBox } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';

const Login = props => {
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
                    title="Login"
                    color="#512DA8"
                />
            </View>
        </View>
    );
};

Login.navigationOptions = {
    title: 'Login',
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20,
    },
    formInput: {
        margin: 40,
    },
    formCheckbox: {
        margin: 40,
        backgroundColor: null,
    },
    formButton: {
        margin: 60,
    },
});

export default Login;
