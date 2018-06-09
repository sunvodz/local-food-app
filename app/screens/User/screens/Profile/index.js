import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

import AuthScreen from 'app/screens/Auth';
import ProfileTabNavigation from 'app/navigations/ProfileTabNavigation';

import { trans } from 'app/shared';
import { ScreenHeader } from 'app/components';

class Profile extends Component {
  componentWillMount() {
    // Todo: try to auth user in memory after connection failure
  }

  render() {
    if (!this.props.auth.user || this.props.auth.loading) {
      return (
        <AuthScreen {...this.props} fullscreen={true} />
      );
    }

    let profileTabNavProps = {
      userStackNavigation: this.props.navigation,
      lang: this.props.lang,
    }

    return (
      <View style={{flex: 1}}>
        <ScreenHeader title={trans('your_account', this.props.lang)} right navigation={this.props.navigation} />
        <ProfileTabNavigation screenProps={profileTabNavProps} />
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

export default connect(mapStateToProps)(Profile);
