import React, { Component } from 'react';
import { Text, View } from 'react-native';
import _ from 'lodash';

import { sharedActions } from 'app/shared';
import { ContentWrapper, TextInput, Card, Button } from 'app/components';

export default class AuthScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(nextProps.auth, this.props.auth);
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
      <ContentWrapper>
        <Card header="Logga in på Local Food Nodes">
          <TextInput editable={!this.props.auth.loading} label="Email" placeholder='johanna@email.com' onChangeText={this.onChange.bind(this, 'email')} />
          <TextInput editable={!this.props.auth.loading} label="password" placeholder='Skriv in ditt lösenord' onChangeText={this.onChange.bind(this, 'password')} secureTextEntry />
          <Button onPress={this.onLogin.bind(this)} title="Login" accessibilityLabel="Login" loading={this.props.auth.loading} />
        </Card>
      </ContentWrapper>
    );
  }
}
