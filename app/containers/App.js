import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, StatusBar } from 'react-native';
import { Notifications } from 'expo';

import MainTabNavigation from 'app/navigations/MainTabNavigation';
import MainTabAuthNavigation from 'app/navigations/MainTabAuthNavigation';
import { Alert } from 'app/containers';

import { sharedActions, sharedActionTypes } from 'app/shared';
import * as mapActions from 'app/screens/Map/actions';
import * as userNodesActions from 'app/screens/User/screens/Nodes/actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.notificationSubscription = Notifications.addListener(this.handleNotification.bind(this));
  }

  componentDidMount() {
    this.props.dispatch(sharedActions.loadUser());
    this.props.dispatch(mapActions.fetchCurrentLocation());
    this.props.dispatch(mapActions.fetchNodes());
    this.props.dispatch(userNodesActions.fetchUserNodes());
  }

  handleNotification = (notification) => {
    // Om det är "hämta notifikation" så visa på ett mer permanent sätt
    const { dispatch } = this.props;

    dispatch({
      type: sharedActionTypes.NOTIFICATION_RECEIVED,
      title: notification.data.title,
      message: notification.data.message,
    });
  };

  render() {
    let currentLang = this.props.auth.user ? this.props.auth.user.language : 'en';

    // Spash
    if (this.props.map.loading) {
      return (
        <View style={styles.splash}>
          <StatusBar barStyle="light-content" />
          <Image style={styles.logo} source={require('../../assets/images/logo-white.png')} />
          <Text style={styles.splashHeader}>Local Food Nodes</Text>
        </View>
      );
    }

    let tabbar = <MainTabNavigation screenProps={{auth: this.props.auth, lang: currentLang}} />;
    if (this.props.auth.user) {
      tabbar = <MainTabAuthNavigation screenProps={{auth: this.props.auth, lang: currentLang}} />;
    }

    return (
      <View style={{flex: 1, backgroundColor: '#f4f4f0'}}>
        <StatusBar barStyle="light-content" />
        {tabbar}
        <Alert lang={currentLang} />
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { map, auth } = state;

  return {
    map,
    auth
  }
}

export default connect(mapStateToProps)(App);

const styles = {
  splash: {
    alignItems: 'center',
    backgroundColor: '#bf360c',
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    height: 60,
    width: 70,
    margin: 15,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  splashHeader: {
    color: '#fff',
    fontFamily: 'montserrat-semibold',
    fontSize: 24,
  }
};