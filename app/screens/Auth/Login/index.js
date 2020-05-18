import React from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, Image, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { trans } from 'app/shared';
import * as actions from './actions';
import { TextInput, Button } from 'app/components';
import globalStyle from 'app/styles';

const scrollViewProps = {
  contentContainerStyle: {
    minHeight: '100%'
  },
  keyboardShouldPersistTaps: 'always',
  enableOnAndroid: true,
  style: {
    backgroundColor: globalStyle.mainPrimaryColor,
  }
};

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      email: null,
      phone: null,
      password: null,
      terms: false,
    }
  }

  onChange(type, value) {
    let state = this.state;
    state[type] = value;
    this.setState(state);
  }

  onLogin() {
    this.props.dispatch(actions.loginUser(this.state, this.props.system.lang));
  }

  navigateToSignUp() {
    this.props.navigation.navigate('SignUp');
  }

  navigateToFAQ() {
    this.props.navigation.navigate('FAQ', {
      lang: this.props.system.lang
    });
  }

  navigateToLanguageSelect() {
    this.props.navigation.navigate('LanguageSelect');
  }

  render() {
    const lang = this.props.system.lang;

    let button = <Button icon='sign-in' onPress={this.onLogin.bind(this)} title={trans('Login', lang)} loading={this.props.loading} />;
    if (this.props.auth.loading) {
      button = <ActivityIndicator color="#fff" />;
    }

    return (
      <KeyboardAwareScrollView {...scrollViewProps}>
        <View style={{flex: 1, justifyContent: 'space-between'}}>
          <View style={{paddingTop: 50, paddingBottom: 5}}>
            <Image style={styles.logo} source={require('../../../../assets/images/logo-white.png')} />
            <View style={[styles.wrapper]}>
              <TextInput key='email' label={trans('Email', lang)} defaultValue={this.state.email} editable={!this.props.loading} placeholder={trans('Your email', lang)} onChangeText={this.onChange.bind(this, 'email')} autoCapitalize='none' keyboardType="email-address" />
              <TextInput key='password' label={trans('Password', lang)} defaultValue={this.state.password} editable={!this.props.loading} placeholder={trans('Your password', lang)} onChangeText={this.onChange.bind(this, 'password')} secureTextEntry />
              {button}
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

function mapStateToProps(state) {
  const { auth, system } = state;

  return {
    auth,
    system,
  }
}

export default connect(mapStateToProps)(Login);

let styles = {
  scrollView: {
    minHeight: '100%'
  },
  logo: {
    height: 60,
    width: 70,
    margin: 15,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  wrapper: {
    flex: 1,
    padding: 15,
  },
};
