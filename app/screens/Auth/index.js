import React from 'react';
import { connect } from 'react-redux';
import { Text, View, Image, Switch, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import _ from 'lodash';

import { sharedActions, trans } from 'app/shared';
import { TextInput, Button, Loader, ScreenHeader, SelectInput } from 'app/components';
import globalStyle from 'app/styles';

class AuthScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      email: null,
      phone: null,
      password: null,
      terms: false,
      language: 'en',
      toggleHelp: false,
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
    this.props.dispatch(sharedActions.userActions.loginUser(this.state));
  }

  onSignup() {
    this.props.dispatch(sharedActions.userActions.createAccount(this.state, this.state.language));
  }

  toggleForms() {
    this.props.dispatch(sharedActions.toggleAuthForm());
  }

  toggleHelp() {
    this.setState({
      toggleHelp: !this.state.toggleHelp
    });
  }

  onTermsChange() {
    this.setState({terms: !this.state.terms});
  }

  onLanguageChange(language) {
    this.setState({language: language});
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

    let content = null;
    let toggleText = <Text style={styles.toggleText} onPress={this.toggleForms.bind(this)}>Create an account</Text>;
    if (this.props.auth.createAccountForm) {
      toggleText = <Text style={styles.toggleText} onPress={this.toggleForms.bind(this)}>Login to your account</Text>;

      content = (
        <View style={styles.wrapper}>
          <Text style={styles.infoText}>{trans('Find local food nodes near you and order directly from your local producers', this.props.lang)}</Text>
          <TextInput key='name' label={trans('Name', this.props.lang)} defaultValue={this.state.name} editable={!this.props.auth.loading} placeholder="Your name" onChangeText={this.onChange.bind(this, 'name')} />
          <TextInput key='email' label={trans('Email', this.props.lang)} defaultValue={this.state.email} editable={!this.props.auth.loading} placeholder="Your email" onChangeText={this.onChange.bind(this, 'email')} autoCapitalize='none' keyboardType="email-address"/>
          <TextInput key='phone' label={trans('Phone', this.props.lang)} defaultValue={this.state.phone} editable={!this.props.auth.loading} placeholder="Your phone number" onChangeText={this.onChange.bind(this, 'phone')} />
          <TextInput key='password' label={trans('Password', this.props.lang)} defaultValue={this.state.password} editable={!this.props.auth.loading} placeholder="Choose a password" hint="Minimum 8 characters" onChangeText={this.onChange.bind(this, 'password')} secureTextEntry />

          <SelectInput
            label='Select language'
            placeholder={{label: 'Select language', value: null}}
            items={[{
              label: 'English',
              value: 'en',
            },
            {
              label: 'Svenska',
              value: 'sv',
            }]}
            style={{fontSize: 20}}
            onValueChange={this.onLanguageChange.bind(this)}
            hideIcon={true}
            value={this.state.language} />

          <View style={styles.switchWrapper}>
            <Switch
              value={this.state.terms}
              onChange={this.onTermsChange.bind(this)}
              trackColor={{false:'#d58067', true:'#d58067'}}
              ios_backgroundColor={'#d58067'}
              />
              <Text style={styles.switchLabel}>{this.state.terms ? 'I accept' : 'I dont accept'}</Text>
          </View>
          <Text style={{color: '#fff', flex: 1, marginTop: 5, marginBottom: 5, fontFamily: 'montserrat-regular'}}>{trans('Accept our terms and privacy policy')}</Text>
          <Button icon='user' style={styles.button} onPress={this.onSignup.bind(this)} title={trans('Create account')} loading={this.props.auth.loading} disabled={!this.state.terms}/>
          {toggleText}
        </View>
      );
    } else {
      content = (
        <View style={[styles.wrapper]}>
          <Text style={styles.infoText}>Login to your account to order local food directly from your local producers</Text>
          <TextInput key='email' label={trans('Email', this.props.lang)} defaultValue={this.state.email} editable={!this.props.auth.loading} placeholder='Your email' onChangeText={this.onChange.bind(this, 'email')} autoCapitalize='none' keyboardType="email-address" />
          <TextInput key='password' label={trans('Password', this.props.lang)} defaultValue={this.state.password} editable={!this.props.auth.loading} placeholder='Your password' onChangeText={this.onChange.bind(this, 'password')} secureTextEntry />
          <Button icon='sign-in' style={styles.button} onPress={this.onLogin.bind(this)} title="Login" loading={this.props.auth.loading} />
          {toggleText}
        </View>
      );
    }

    let needHelpLink = <Text style={styles.needHelpLink}>Need help?</Text>;
    if (this.state.toggleHelp) {
      content = (
        <View style={styles.needHelpWrapper}>
          <Text style={styles.needHelpText}>{trans('If you have problems login in, creating an account or anything else please contact us on info@localfoodnodes.org and we will help you.')}</Text>
          <Text style={styles.needHelpText}>{trans('You can also chat with us on localfoodnodes.org/support or write to us on Twitter.')}</Text>
          <Text style={styles.needHelpText}>{trans('We will post information about operational disturbances on Twitter.')}</Text>
          <Text style={[styles.needHelpLink, {textAlign: 'left'}]}>{trans('Twitter: @localfoodnodes')}</Text>
        </View>
      );
      needHelpLink = <Text style={styles.needHelpLink}>Close</Text>;
    }

    return (
      <KeyboardAwareScrollView {...scrollViewProps}>
        <View style={{flex: 1, justifyContent: 'space-between'}}>
          <View style={{paddingTop: 50, paddingBottom: 5}}>
            <Image style={styles.logo} source={require('../../../assets/images/logo-white.png')} />
            {content}
          </View>
          <TouchableOpacity onPress={this.toggleHelp.bind(this)}>
            {needHelpLink}
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
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
    fontFamily: 'montserrat-semibold',
    lineHeight: 18,
    textAlign: 'center',
  },
  button: {
    button: {
      marginVertical: 15,
    }
  },
  wrapper: {
    flex: 1,
    padding: 15,
  },
  header: {
    color: '#fff',
    fontFamily: 'montserrat-semibold',
  },
  switchWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  switchLabel: {
    color: '#fff',
    flex: 1,
    marginLeft: 10,
    marginTop: 5,
    fontFamily: 'montserrat-semibold',
  },
  needHelpLink: {
    color: '#fff',
    fontFamily: 'montserrat-regular',
    marginBottom: 15,
    textAlign: 'center',
  },
  needHelpWrapper: {
    color: '#fff',
    fontFamily: 'montserrat-regular',
    padding: 15,
  },
  needHelpText: {
    color: '#fff',
    fontFamily: 'montserrat-regular',
    marginBottom: 15,
  },
};
