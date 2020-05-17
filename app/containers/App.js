import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StatusBar, ActivityIndicator, Text } from 'react-native';
import { Notifications } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { Alert, CartIcon } from 'app/containers';
import { MaintenanceMode } from 'app/components';
import { sharedActions, sharedActionTypes, trans } from 'app/shared';
import * as userNodesActions from 'app/screens/User/Nodes/actions';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

// Auth navigation screens
import Login from 'app/screens/Auth/Login';
import SignUp from 'app/screens/Auth/SignUp';
import AuthSupportStackNavigation from '../navigations/AuthSupportStackNavigation';

// Main navigation screens
import MapStackNavigation from '../navigations/MapStackNavigation';
import UserStackNavigation from '../navigations/UserStackNavigation';
import CartStackNavigation from '../navigations/CartStackNavigation';
import globalStyle from 'app/styles';

const BottomTabNavigator = createBottomTabNavigator();
const BottomTabNavigatorConfig = {
  tabBarOptions: {
    showIcon: true,
    showLabel: false,
    activeTintColor: globalStyle.primaryColor,
    inactiveTintColor: '#999',
    activeBackgroundColor: '#fafafa',
    inactiveBackgroundColor: '#fafafa',
    indicatorStyle: {
      backgroundColor: '#fafafa',
    },
    style: {
      alignItems: 'center',
      backgroundColor: '#fafafa',
    }
  },
  screenOptions: ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      // Auth navigation
      if (route.name === 'Login') {
        return <FontAwesome5 name='sign-in-alt' size={size} color={color} />
      } else if (route.name === 'SignUp') {
        return <FontAwesome5 name='user-plus' size={size} color={color} />
      } else if (route.name === 'AuthSupportStackNavigation') {
        return <FontAwesome name="question-circle" size={size} color={color} />
      }

      // Main navigation
      if (route.name === 'MapStackNavigator') {
        return <FontAwesome5 name='map-marker-alt' size={size} color={color} />
      } else if (route.name === 'UserStackNavigation') {
        return <FontAwesome name='user-circle' size={size} color={color} />
      } else if (route.name === 'CartStackNavigation') {
        return <CartIcon size={size} color={color} />
      }
    },
  })
};

class App extends Component {
  constructor(props) {
    super(props);
    this.notificationSubscription = Notifications.addListener(this.handleNotification.bind(this));
  }

  componentDidMount() {
    this.props.dispatch(sharedActions.userActions.loadUser(false, this.props.system.lang));
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.auth.user && !this.props.nodes) {
      this.props.dispatch(userNodesActions.fetchUserNodes(this.props.system.lang));
    }
  }

  handleNotification = (notification) => {
    const { dispatch } = this.props;

    dispatch({
      type: sharedActionTypes.NOTIFICATION_RECEIVED,
      title: notification.data.title,
      message: notification.data.body,
    });
  };

  render() {
    const lang = this.props.system.lang;

    if (this.props.system.maintenance_mode) {
      return (
        <View style={{flex: 1, backgroundColor: globalStyle.backgroundColor}}>
          <MaintenanceMode dispatch={this.props.dispatch} />
          <Alert />
        </View>
      );
    }

    if (this.props.auth.loading === undefined) {
      return (
        <View style={{flex: 1, backgroundColor: globalStyle.primaryColor}}>
          <ActivityIndicator style={{flex: 1}} color="#fff" />
        </View>
      );
    }

    let initialParams = {
      auth: this.props.auth,
      lang: lang,
    };

    if (!this.props.auth.user) {
      return (
        <NavigationContainer>
          <View style={{flex: 1}}>
            <StatusBar barStyle="light-content" bgColor="transparent" translucent={true} />
            <BottomTabNavigator.Navigator
              tabBarOptions={BottomTabNavigatorConfig.tabBarOptions}
              screenOptions={BottomTabNavigatorConfig.screenOptions}
            >
              <BottomTabNavigator.Screen
                name="Login"
                component={Login}
                options={{
                  title: trans('Login', lang)
                }}
              />
              <BottomTabNavigator.Screen
                name="SignUp"
                component={SignUp}
                options={{
                  title: trans('Create account', lang)
                }}
              />
              <BottomTabNavigator.Screen
                name="AuthSupportStackNavigation"
                component={AuthSupportStackNavigation}
                initialParams={initialParams}
              />
            </BottomTabNavigator.Navigator>
            <Alert />
          </View>
        </NavigationContainer>
      );
    }

    return (
      <NavigationContainer>
        <View style={{flex: 1, backgroundColor: globalStyle.backgroundColor}}>
          <StatusBar barStyle="light-content" bgColor="transparent" translucent={true} />
          <BottomTabNavigator.Navigator
            tabBarOptions={BottomTabNavigatorConfig.tabBarOptions}
            screenOptions={BottomTabNavigatorConfig.screenOptions}
          >
            <BottomTabNavigator.Screen
              name="MapStackNavigator"
              component={MapStackNavigation}
              initialParams={initialParams}
            />
            <BottomTabNavigator.Screen
              name="CartStackNavigation"
              component={CartStackNavigation}
              initialParams={initialParams}
            />
            <BottomTabNavigator.Screen
              name="UserStackNavigation"
              component={UserStackNavigation}
              initialParams={initialParams}
            />
          </BottomTabNavigator.Navigator>
          <Alert />
        </View>
      </NavigationContainer>
    );
  }
}

function mapStateToProps(state) {
  const { auth, nodes, system } = state;

  return {
    auth,
    nodes,
    system
  }
}

export default connect(mapStateToProps)(App);
