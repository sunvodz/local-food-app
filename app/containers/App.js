import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image } from 'react-native';

import MainTabNavigation from 'app/navigations/MainTabNavigation';
import { Alert } from 'app/containers';

import { sharedActions } from 'app/shared';
import * as mapActions from 'app/screens/Map/actions';
import * as userNodesActions from 'app/screens/User/screens/Nodes/actions';

class App extends Component {
  // Initial load
  componentDidMount() {
    this.props.dispatch(sharedActions.loadUser());
    this.props.dispatch(mapActions.fetchNodes());
    this.props.dispatch(mapActions.fetchCurrentLocation());
    this.props.dispatch(userNodesActions.fetchUserNodes());

  }

  render() {
    // Spash
    if (this.props.auth.loading || this.props.map.loading) {
      return (
        <View style={styles.splash}>
          <Image style={styles.logo} source={require('../../assets/images/logo-white.png')} />
          <Text style={styles.splashHeader}>Local Food Nodes</Text>
        </View>
      );
    }

    return (
      <View style={{flex: 1, backgroundColor: '#f4f4f0'}}>
        <Alert />
        <MainTabNavigation />
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