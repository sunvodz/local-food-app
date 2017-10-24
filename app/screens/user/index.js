import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AsyncStorage, Text, View } from 'react-native';
import { Button } from 'react-native-elements'
import { FormLabel, FormInput } from 'react-native-elements'

import * as actions from './actions';

class UserScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'User'
  };

  constructor(props) {
    super(props);
    this.state = {
      user: false
    }
  }

  onClick() {
    this.props.dispatch(actions.authUser());
  }

  render() {
    if (!this.state) {
      return <Text>Loading...</Text>
    }

    if (!this.state.user) {
      return (
        <View>
          <FormLabel>Name</FormLabel>
          <FormInput onChangeText={this.onClick.bind(this)}/>
        </View>
      );
    }

    return (
      <Button onPress={() => this.props.navigation.goBack()} title="Back" />
    );
  }
}

export default connect()(UserScreen);
