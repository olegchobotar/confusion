import React from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import AboutUs from './AboutComponent';
import ContactUs from './ContactComponent';
import DishDetail from './DishDetailComponent';
import { View, Platform } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import Constants from 'expo-constants';

const navigationOptions = {
    headerStyle: {
        backgroundColor: '#512DA8',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        color: '#fff',
    }
};
const MenuNavigator = createStackNavigator({
    Menu: {
        screen: Menu,
        navigationOptions: ({ navigation }) => ({
           headerLeft: <Icon
               name="menu"
               size={24}
               color="white"
               onPress={() => navigation.toggleDrawer()}
           />
        }),
    },
    DishDetail: { screen: DishDetail},
}, {
    navigationOptions,
    initialRouteName: 'Menu',
});

const HomeNavigator = createStackNavigator({
    Home: { screen: Home },
}, {
    navigationOptions,
});

const AboutUsNavigator = createStackNavigator({
    AboutUs: { screen: AboutUs},
}, {
    navigationOptions,
});

const ContactUsNavigator = createStackNavigator({
    ContactUs: { screen: ContactUs},
}, {
    navigationOptions,
});

const MainNavigator = createDrawerNavigator({
    Home: {
        screen: HomeNavigator,
        navigationOptions: {
            title: 'Home',
            drawerLabel: 'Home'
        }
    },
    AboutUs: {
        screen: AboutUsNavigator,
        navigationOptions: {
            title: 'About Us',
            drawerLabel: 'About Us'
        }
    },
    Menu: {
        screen: MenuNavigator,
        navigationOptions: {
            title: 'Menu',
            drawerLabel: 'Menu'
        }
    },
    ContactUs: {
        screen: ContactUsNavigator,
        navigationOptions: {
            title: 'Contact Us',
            drawerLabel: 'Contact Us'
        }
    },
}, {
    drawerBackgroundColor: '#D1C4E9'
});

const Main = () => {
    return (
        <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Constants.headerStatusBarHeight }}>
            <MainNavigator />
        </View>
    );
};

export default Main;
