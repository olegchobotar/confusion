import React, { useEffect } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import AboutUs from './AboutComponent';
import ContactUs from './ContactComponent';
import DishDetail from './DishDetailComponent';
import Reservation from './ReservationComponent';
import { View, Platform, Image, StyleSheet, ScrollView, Text } from 'react-native';
import {
    createStackNavigator,
    createDrawerNavigator,
    DrawerItems,
    SafeAreaView
} from 'react-navigation';
import { Icon } from 'react-native-elements';
import Constants from 'expo-constants';
import fetchComments from "../actions/fetchComments";
import fetchDishes from "../actions/fetchDishes";
import fetchLeaders from "../actions/fetchLeaders";
import fetchPromotions from "../actions/fetchPromotions";
import { connect } from 'react-redux';

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
        screen: (props) => <Menu {...props} />,
        navigationOptions: ({ navigation }) => ({
           headerLeft: <Icon
               name="menu"
               size={24}
               color="white"
               onPress={navigation.toggleDrawer}
           />
        }),
    },
    DishDetail: { screen: (props) => <DishDetail {...props} />},
}, {
    navigationOptions: ({ navigation }) => ({
        ...navigationOptions,
    }),
    initialRouteName: 'Menu',
});

const HomeNavigator = createStackNavigator({
    Home: { screen: (props) => <Home {...props} /> },
}, {
    navigationOptions: ({ navigation }) => ({
        ...navigationOptions,
        headerLeft: <Icon
            name="menu"
            size={24}
            color="white"
            onPress={navigation.toggleDrawer}
        />
    }),
});

const AboutUsNavigator = createStackNavigator({
    AboutUs: { screen: (props) => <AboutUs {...props} />},
}, {
    navigationOptions: ({ navigation }) => ({
        ...navigationOptions,
        headerLeft: <Icon
            name="menu"
            size={24}
            color="white"
            onPress={navigation.toggleDrawer}
        />
    }),
});

const ContactUsNavigator = createStackNavigator({
    ContactUs: { screen: (props) => <ContactUs {...props} />},
}, {
    navigationOptions: ({ navigation }) => ({
        ...navigationOptions,
        headerLeft: <Icon
            name="menu"
            size={24}
            color="white"
            onPress={navigation.toggleDrawer}
        />
    }),
});

const ReservationNavigator = createStackNavigator({
    Reservation: { screen: (props) => <Reservation {...props} />},
}, {
    navigationOptions: ({ navigation }) => ({
        ...navigationOptions,
        headerLeft: <Icon
            name="menu"
            size={24}
            color="white"
            onPress={navigation.toggleDrawer}
        />
    }),
});

const CustomDrawerContentComponent = props => (
  <ScrollView>
      <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
          <View style={styles.drawerHeader}>
              <View style={{ flex: 1 }}>
                  <Image source={require('./assets/logo.png')} style={styles.drawerImage} />
              </View>
              <View style={{ flex: 2 }}>
                  <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
              </View>
          </View>
          <DrawerItems {...props} />
      </SafeAreaView>
  </ScrollView>
);

const MainNavigator = createDrawerNavigator({
    Home: {
        screen: HomeNavigator,
        navigationOptions: {
            title: 'Home',
            drawerLabel: 'Home',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name="home"
                    type="font-awesome"
                    size={24}
                    color={tintColor}
                />
            ),
        }
    },
    AboutUs: {
        screen: AboutUsNavigator,
        navigationOptions: {
            title: 'About Us',
            drawerLabel: 'About Us',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name="info-circle"
                    type="font-awesome"
                    size={24}
                    color={tintColor}
                />
            )
        }
    },
    Menu: {
        screen: MenuNavigator,
        navigationOptions: {
            title: 'Menu',
            drawerLabel: 'Menu',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name="list"
                    type="font-awesome"
                    size={24}
                    color={tintColor}
                />
            )
        }
    },
    ContactUs: {
        screen: ContactUsNavigator,
        navigationOptions: {
            title: 'Contact Us',
            drawerLabel: 'Contact Us',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name="address-card"
                    type="font-awesome"
                    size={22}
                    color={tintColor}
                />
            )
        }
    },
    Reservation: {
        screen: ReservationNavigator,
        navigationOptions: {
            title: 'Reserve Table',
            drawerLabel: 'Reserve Table',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name="cutlery"
                    type="font-awesome"
                    size={24}
                    color={tintColor}
                />
            )
        }
    },
}, {
    drawerBackgroundColor: '#D1C4E9',
    contentComponent: CustomDrawerContentComponent,
});

const Main = props => {
    useEffect(() => {
        props.fetchDishes();
        props.fetchComments();
        props.fetchPromotions();
        props.fetchLeaders();
    }, [])

    return (
        <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Constants.headerStatusBarHeight }}>
            <MainNavigator />
        </View>
    );
};

const styles = StyleSheet.create({
   container: {
       flex: 1,
   },
    drawerHeader: {
       backgroundColor: '#512DA8',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
    },
    drawerHeaderText: {
       color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    drawerImage: {
       margin: 10,
        width: 80,
        height: 60,
    }
});

export default connect(
    null,
    { fetchPromotions, fetchLeaders, fetchDishes, fetchComments }
)(Main);
