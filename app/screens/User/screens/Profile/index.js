import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

import AuthScreen from 'app/screens/Auth';
import ProfileTabNavigation from 'app/navigations/ProfileTabNavigation';

import { trans } from 'app/shared';
import { Empty, ScreenHeader } from 'app/components';

class Profile extends Component {
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
