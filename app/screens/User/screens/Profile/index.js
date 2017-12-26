import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Button } from 'react-native';

import AuthScreen from 'app/screens/Auth';
import { TextInput, ContentWrapper, Card, Loader } from 'app/components';
import { sharedActions } from 'app/shared';

import * as actions from './actions';

class Profile extends Component {
  navigateOrders() {
    const { navigate } = this.props.navigation;

    navigate('Orders');
  }

  navigateSettings() {
    const { navigate } = this.props.navigation;

    navigate('Settings');
  }

  render() {
    let content = <Loader />;
    let headerLabel = 'Account';

    if (!this.props.auth.user && !this.props.auth.loading) {
      content = (
        <ContentWrapper>
          <AuthScreen {...this.props} />
        </ContentWrapper>
      );
    } else if (this.props.auth.user) {
      content = (
        <ContentWrapper>
          <Text>{this.props.auth.user.name}</Text>
          <Card onPress={this.navigateOrders.bind(this)}><Text>Orders</Text></Card>
          <Card onPress={this.navigateSettings.bind(this)}><Text>Settings</Text></Card>
        </ContentWrapper>
      );
    }

    return (
      <View style={{flex: 1}}>
        {content}
      </View>
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
