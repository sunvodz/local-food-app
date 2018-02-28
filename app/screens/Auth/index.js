import React, { Component } from 'react';
import { Text, View, Image, Dimensions } from 'react-native';
import _ from 'lodash';

import { sharedActions } from 'app/shared';
import { ContentWrapper, TextInput, Card, Button, Loader } from 'app/components';

export default class AuthScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      email: null,
      phone: null,
      password: null,
    }
  }

  componentDidMount() {
    this.props.dispatch(sharedActions.loadUser());
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(nextProps.auth, this.props.auth) || !_.isEqual(nextState, this.state);
  }

  onChange(type, value) {
    let state = this.state;
    state[type] = value;
    this.setState(state);
  }

  onLogin() {
    this.props.dispatch(sharedActions.loginUser(this.state));
  }

  onSignup() {
    this.props.dispatch(sharedActions.createAccount(this.state));
  }

  toggleForms() {
    this.props.dispatch(sharedActions.toggleAuthForm());
  }

  render() {
    if (_.isEmpty(this.props.auth)) {
      return <Loader />;
    }

    let card = (
      <Card header="Sign in">
        <TextInput defaultValue={this.state.email} editable={!this.props.auth.loading} label="Email" placeholder='john@doe.com' onChangeText={this.onChange.bind(this, 'email')} />
        <TextInput defaultValue={this.state.password} editable={!this.props.auth.loading} label="Password" placeholder='Your password' onChangeText={this.onChange.bind(this, 'password')} secureTextEntry />
        <Button onPress={this.onLogin.bind(this)} title="Login" accessibilityLabel="Login" loading={this.props.auth.loading} />
        <Text onPress={this.toggleForms.bind(this)} style={styles.toggleLink}>Create account</Text>
      </Card>
    );

    if (this.props.auth.createAccountForm) {
      card = (
        <Card header="Create account">
          <TextInput defaultValue={this.state.name} editable={!this.props.auth.loading} label="Name" placeholder='John Doe' onChangeText={this.onChange.bind(this, 'name')} />
          <TextInput defaultValue={this.state.email} editable={!this.props.auth.loading} label="Email" placeholder='john@doe.com' onChangeText={this.onChange.bind(this, 'email')} />
          <TextInput defaultValue={this.state.phone} editable={!this.props.auth.loading} label="Phone" placeholder='0701234567' onChangeText={this.onChange.bind(this, 'phone')} />
          <TextInput defaultValue={this.state.password} editable={!this.props.auth.loading} label="Password" placeholder='8 characters' onChangeText={this.onChange.bind(this, 'password')} secureTextEntry />
          <Button onPress={this.onSignup.bind(this)} title="Create account" accessibilityLabel="Create account" loading={this.props.auth.loading} />
          <Text onPress={this.toggleForms.bind(this)} style={styles.toggleLink}>Login</Text>
        </Card>
      );
    }

    if (this.props.fullscreen) {
      const wrapperStyle = {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      };

      return (
        <ContentWrapper>
          {card}
        </ContentWrapper>
      );
    } else {
      return card;
    }
  }
}

const styles = {
  toggleLink: {
    color: '#ffa522',
    paddingTop: 15,
    paddingBottom: 0,
    alignSelf: 'center',
  }
};
