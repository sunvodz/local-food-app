import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StatusBar } from 'react-native';
import { Notifications } from 'expo';

import MainTabNavigation from 'app/navigations/MainTabNavigation';
import AuthScreen from 'app/screens/Auth';
import { Alert } from 'app/containers';
import { Loader } from 'app/components';

import { sharedActions, sharedActionTypes } from 'app/shared';
import * as userNodesActions from 'app/screens/User/screens/Nodes/actions';
import globalStyle from 'app/styles';

class App extends Component {
  constructor(props) {
    super(props);
    this.notificationSubscription = Notifications.addListener(this.handleNotification.bind(this));
  }

  componentDidMount() {
    this.props.dispatch(sharedActions.loadUser());
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.auth.user && !this.props.nodes) {
      this.props.dispatch(userNodesActions.fetchUserNodes());
    }
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

    if (!this.props.auth.user) {
      return (
        <View style={{flex: 1}}>
          <StatusBar barStyle='light-content' />
          <AuthScreen {...this.props} />
          <Alert lang={currentLang} />
        </View>
      );
    }

    let tabBar = <MainTabNavigation screenProps={{auth: this.props.auth, lang: currentLang}} />;

    return (
      <View style={{flex: 1, backgroundColor: globalStyle.backgroundColor}}>
        <StatusBar barStyle='light-content' />
        {tabBar}
        <Alert lang={currentLang} />
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { auth, nodes } = state;

  return {
    auth,
    nodes
  }
}

export default connect(mapStateToProps)(App);

let styles = {
  splash: {
    alignItems: 'center',
    backgroundColor: globalStyle.primaryColor,
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
    fontFamily: 'montserrat-bold',
    fontSize: 24,
  },
};