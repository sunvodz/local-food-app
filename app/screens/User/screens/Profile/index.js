import React, { Component } from 'react';
import { connect } from 'react-redux';

import AuthScreen from 'app/screens/Auth';
import ProfileTabNavigation from 'app/navigations/ProfileTabNavigation';

import { ServerError } from 'app/components';

class Profile extends Component {
  render() {
    if (this.props.auth.serverError) {
      return <ServerError />;
    }

    if (!this.props.auth.user || this.props.auth.loading) {
      return (
        <AuthScreen {...this.props} fullscreen={true} />
      );
    }

    return <ProfileTabNavigation screenProps={this.props.screenProps} />
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
