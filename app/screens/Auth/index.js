import React from 'react';
import { connect } from 'react-redux';
import { Text, View, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FontAwesome as Icon } from '@expo/vector-icons';
import _ from 'lodash';

import { sharedActions, trans } from 'app/shared';
import { TextInput, Button, Loader, ScreenHeader } from 'app/components';
import globalStyle from 'app/styles';

class AuthScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      email: null,
      phone: null,
      password: null,
    }
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

    let scrollViewProps = {
      contentContainerStyle: styles.scrollView,
      keyboardShouldPersistTaps: 'always',
      enableOnAndroid: true,
      style: {
        backgroundColor: globalStyle.primaryColor,
      }
    };

    let navBackIcon = this.props.navigation.getParam('navBackIcon', false);

    let toggleText = <Text style={styles.toggleText} onPress={this.toggleForms.bind(this)}>Create an account</Text>;
    if (this.props.auth.createAccountForm) {
      toggleText = <Text style={styles.toggleText} onPress={this.toggleForms.bind(this)}>Login to your account</Text>;

      return (
        <View style={{flex: 1}}>
          <ScreenHeader title={trans('create_account', this.props.lang)} left={navBackIcon} navigation={this.props.navigation} />
          <KeyboardAwareScrollView {...scrollViewProps}>
            <Image style={styles.logo} source={require('../../../assets/images/logo-white.png')} />
            <View style={styles.wrapper}>
              <Text style={styles.infoText}>Find local food nodes near you and order directly from your local producers</Text>
              <TextInput key='name' label={trans('name', this.props.lang)} defaultValue={this.state.name} editable={!this.props.auth.loading} placeholder="Your name" onChangeText={this.onChange.bind(this, 'name')} />
              <TextInput key='email' label={trans('email', this.props.lang)} defaultValue={this.state.email} editable={!this.props.auth.loading} placeholder="Your email" onChangeText={this.onChange.bind(this, 'email')} autoCapitalize='none' />
              <TextInput key='phone' label={trans('phone', this.props.lang)} defaultValue={this.state.phone} editable={!this.props.auth.loading} placeholder="Your phone number" onChangeText={this.onChange.bind(this, 'phone')} />
              <TextInput key='password' label={trans('password', this.props.lang)} defaultValue={this.state.password} editable={!this.props.auth.loading} placeholder="Choose a password" hint="Minimum 8 characters" onChangeText={this.onChange.bind(this, 'password')} secureTextEntry />
              <Button icon='user' style={styles.button} onPress={this.onSignup.bind(this)} title="Create account" accessibilityLabel="Create account" loading={this.props.auth.loading} />
              {toggleText}
            </View>
          </KeyboardAwareScrollView>
        </View>
      );
    }

    return (
      <View style={{flex: 1}}>
        <ScreenHeader title={trans('login', this.props.lang)} left={navBackIcon} navigation={this.props.navigation} />
        <KeyboardAwareScrollView {...scrollViewProps}>
          <Image style={styles.logo} source={require('../../../assets/images/logo-white.png')} />
          <View style={styles.wrapper}>
            <Text style={styles.infoText}>Login to your account to order local food directly from your local producers</Text>
            <TextInput key='email' label={trans('email', this.props.lang)} defaultValue={this.state.email} editable={!this.props.auth.loading} placeholder='Your email' onChangeText={this.onChange.bind(this, 'email')} autoCapitalize='none' />
            <TextInput key='password' label={trans('password', this.props.lang)} defaultValue={this.state.password} editable={!this.props.auth.loading} placeholder='Your password' onChangeText={this.onChange.bind(this, 'password')} secureTextEntry />
            <Button icon='sign-in' style={styles.button} onPress={this.onLogin.bind(this)} title="Login" accessibilityLabel="Login" loading={this.props.auth.loading} />
            {toggleText}
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { auth } = state;

  return {
    auth
  }
}

export default connect(mapStateToProps)(AuthScreen);

let styles = {
  logo: {
    height: 60,
    width: 70,
    margin: 15,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  infoText: {
    color: '#fff',
    flex: 1,
    fontFamily: 'montserrat-regular',
    lineHeight: 18,
    marginBottom: 30,
    textAlign: 'center',
  },
  toggleText: {
    color: '#fff',
    flex: 1,
    fontFamily: 'montserrat-regular',
    lineHeight: 18,
    textAlign: 'center',
  },
  button: {
    button: {
      marginVertical: 15,
    }
  },
  wrapper: {
    padding: 15,
  },
  header: {
    color: '#fff',
    fontFamily: 'montserrat-semibold',
  },
};
