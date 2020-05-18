import React from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, Image, Text, Switch, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import _ from 'lodash';
import { trans } from 'app/shared';
import * as actions from './actions';
import Terms from './components/Terms';
import { Button, Loader, SelectInput,TextInput } from 'app/components';
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

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      email: null,
      phone: null,
      password: null,
      language: null,
      terms: false,
    }
  }

  onChange(type, value) {
    let state = this.state;
    state[type] = value;
    this.setState(state);
  }

  onSignup() {
    this.props.dispatch(actions.createAccount(this.state, this.state.language));
  }

  onAcceptTerms() {
    this.setState({terms: true});
  }

  onLanguageChange(language) {
    this.setState({language: language});
  }

  render() {
    const lang = this.props.system.lang;

    if (!this.state.terms) {
      return <Terms lang={lang} onAcceptTerms={this.onAcceptTerms.bind(this)} />;
    }

    let button = <Button style={styles.button} icon='user' onPress={this.onSignup.bind(this)} title={trans('Create account', lang)} />;
    if (this.props.auth.loading) {
      button = <ActivityIndicator color="#fff" />;
    }

    return (
      <KeyboardAwareScrollView {...scrollViewProps}>
        <View style={{flex: 1, justifyContent: 'space-between'}}>
          <View style={{paddingTop: 50, paddingBottom: 5}}>
            <Image style={styles.logo} source={require('../../../../assets/images/logo-white.png')} />
            <View style={styles.wrapper}>
              <TextInput key='name' label={trans('Name', lang)} defaultValue={this.state.name} editable={!this.props.loading} placeholder={trans('Your name', lang)} onChangeText={this.onChange.bind(this, 'name')} />
              <TextInput key='email' label={trans('Email', lang)} defaultValue={this.state.email} editable={!this.props.loading} placeholder={trans('Your email', lang)} onChangeText={this.onChange.bind(this, 'email')} autoCapitalize='none' keyboardType="email-address"/>
              <TextInput key='phone' label={trans('Phone', lang)} defaultValue={this.state.phone} editable={!this.props.loading} placeholder={trans('Your phone number', lang)} onChangeText={this.onChange.bind(this, 'phone')} />
              <TextInput key='password' label={trans('Password', lang)} defaultValue={this.state.password} editable={!this.props.loading} placeholder={trans('Choose a password', lang)} hint={trans('Minimum 8 characters', lang)} onChangeText={this.onChange.bind(this, 'password')} secureTextEntry />

              <SelectInput
                label={trans('Select language', lang)}
                placeholder={{label: trans('Select language', lang), value: null}}
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
                value={this.state.language || this.props.system.lang}
              />
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

export default connect(mapStateToProps)(SignUp);

let styles = {
  logo: {
    height: 60,
    width: 70,
    margin: 15,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  button: {
    button: {
      marginTop: 15,
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
};
