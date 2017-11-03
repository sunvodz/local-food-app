import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Button } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';

import AuthScreen from '../Auth';
import { Header, TextInput, ContentWrapper, Card, Loader } from '../../components';
import { sharedActions } from '../../shared';

import * as actions from './actions';

import UserNavigation from './components/Navigation';

class UserScreen extends Component {
  componentDidUpdate(prevProps, prevState) {
    const alert = this.props.user && this.props.user.alert ? this.props.user.alert : null;

    if (alert && this.dropdownAlert) {
      this.props.dispatch(sharedActions.resetAlert());
      this.dropdownAlert.alertWithType(alert.type, alert.label, alert.message);
    }
  }

  render() {
    let content = null;
    let headerLabel = 'Account';

    if (this.props.auth.loading) {
      content = <Loader />;
    } else if (!this.props.auth.user) {
      content = (
        <ContentWrapper>
          <AuthScreen {...this.props} />
        </ContentWrapper>
      );
    } else if (this.props.auth.user) {
      headerLabel = this.props.auth.user.name;
      content = <UserNavigation />;
    }

    return (
      <View style={{flex: 1}}>
        <Header label={headerLabel} />
        {content}
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
