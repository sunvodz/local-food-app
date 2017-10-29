import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Button } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';

import AuthScreen from '../Auth';
import { Header, TextInput, ContentWrapper, Card } from '../../components';
import { resetAlert } from '../../shared/actions';

import * as actions from './actions';
import * as authActions from '../Auth/actions';

class UserScreen extends Component {
  componentDidMount() {
    this.props.dispatch(authActions.fetchUser());
  }

  componentDidUpdate(prevProps, prevState) {
    const alert = this.props.user && this.props.user.alert ? this.props.user.alert : null;

    if (alert && this.dropdownAlert) {
      this.props.dispatch(resetAlert());
      this.dropdownAlert.alertWithType(alert.type, alert.label, alert.message);
    }
  }

  onLogout() {
    this.props.dispatch(authActions.logoutUser());
  }

  render() {
    let content = null;

    if (this.props.auth.loading) {
      return <Text>Loading...</Text>;
    }

    if (!this.props.auth.user) {
       content = <AuthScreen {...this.props} />;
    }

    if (this.props.auth.user) {
      content = (
        <View>
          <Text>{this.props.auth.user.name} is logged in!</Text>
          <Button onPress={this.onLogout.bind(this)} title="Logout" accessibilityLabel="Logout" />
        </View>
      );
    }

    return (
      <View style={{flex: 1}}>
        <Header label='Account' />
        <ContentWrapper>
          {content}
        </ContentWrapper>
        <DropdownAlert ref={ref => this.dropdownAlert = ref} />
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

export default connect(mapStateToProps)(UserScreen);
