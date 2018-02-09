import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';

import { ContentWrapper, Card, Button } from 'app/components';
import { sharedActions } from 'app/shared';

class Settings extends Component {
  onLogout() {
    this.props.dispatch(sharedActions.logoutUser());
  }

  render() {
    return (
      <ContentWrapper>
          <Button onPress={this.onLogout.bind(this)} title="Logout" accessibilityLabel="Logout" />
      </ContentWrapper>
    );
  }
}

function mapStateToProps(state) {
  const { settings } = state;

  return {
    settings,
  }
}

export default connect(mapStateToProps)(Settings);
