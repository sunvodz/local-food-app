import React, { Component } from 'react';
import { Text, View, Image, Button } from 'react-native';

import { sharedActions } from 'app/shared';
import { TextInput, Card } from 'app/components';

export default class AuthScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
    }
  }

  onChange(type, value) {
    let state = this.state;
    state[type] = value;
    this.setState(state);
  }

  onLogin() {
    this.props.dispatch(sharedActions.loginUser(this.state.email, this.state.password));
  }

  render() {
    return (
      <Card>
        <TextInput placeholder='Email' onChangeText={this.onChange.bind(this, 'email')} />
        <TextInput placeholder='Password' onChangeText={this.onChange.bind(this, 'password')} secureTextEntry />
        <Button onPress={this.onLogin.bind(this)} title="Login" accessibilityLabel="Login" />
      </Card>
    );
  }
}
