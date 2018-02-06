import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Button } from 'react-native';
import _ from 'lodash';

import AuthScreen from 'app/screens/Auth';
import { TextInput, ContentWrapper, Card, Loader } from 'app/components';
import { sharedActions } from 'app/shared';

import * as actions from './actions';

class Profile extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(nextProps.user, this.props.user) || !_.isEqual(nextProps.auth, this.props.auth);
  }

  navigateOrders() {
    const { navigate } = this.props.navigation;

    navigate('Orders');
  }

  navigateSettings() {
    const { navigate } = this.props.navigation;

    navigate('Settings');
  }

  render() {
    if (!this.props.auth.user || this.props.auth.loading) {
      return (
        <AuthScreen {...this.props} />
      );
    }

    return (
      <ContentWrapper>
        <Text>{this.props.auth.user.name}</Text>
        <Card onPress={this.navigateOrders.bind(this)}><Text>Orders</Text></Card>
        <Card onPress={this.navigateSettings.bind(this)}><Text>Settings</Text></Card>
      </ContentWrapper>
    );
  }
}

function mapStateToProps(state) {
  const { auth, user } = state;

  return {
    auth,
    user,
  }
}

export default connect(mapStateToProps)(Profile);
