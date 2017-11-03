import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Button } from 'react-native';

import { ContentWrapper, Card } from '../../components';
import { sharedActions } from '../../shared';

class SettingsScreen extends Component {

  onLogout() {
    this.props.dispatch(sharedActions.logoutUser());
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'red'}}>
        <ContentWrapper>
          <Card>
            <Button onPress={this.onLogout.bind(this)} title="Logout" accessibilityLabel="Logout" />
          </Card>
        </ContentWrapper>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { auth, settings } = state;

  return {
    auth,
    settings,
  }
}

export default connect(mapStateToProps)(SettingsScreen);
