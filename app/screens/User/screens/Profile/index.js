import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { FontAwesome as Icon } from '@expo/vector-icons';

import AuthScreen from 'app/screens/Auth';
import ProfileTabNavigation from 'app/navigations/ProfileTabNavigation';


import { trans } from 'app/shared';
import { ScreenHeader } from 'app/components';
import { createAppContainer } from 'react-navigation';

const ProfileTabs = createAppContainer(ProfileTabNavigation)
class Profile extends Component {
  render() {
    if (!this.props.auth.user || this.props.auth.loading) {
      return (
        <AuthScreen {...this.props} />
      );
    }

    let profileTabNavProps = {
      userStackNavigation: this.props.navigation,
      lang: this.props.lang,
    }

    // console.log(this.props.navigation);
    

    return (
      <View style={{flex: 1}}>
        <ScreenHeader title={trans('your_account', this.props.lang)} right navigation={this.props.navigation} />
        <ProfileTabs screenProps={profileTabNavProps} />
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
