import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

import { ContentWrapper, Card, Button } from 'app/components';
import { sharedActions } from 'app/shared';

class Settings extends Component {
  onLogout() {
    this.props.dispatch(sharedActions.logout());
  }

  navigateToMembershipPayment(donation) {
    const { navigate } = this.props.userStackNavigation.navigation;

    navigate('Membership');
  }

  navigateToDeleteAccount() {
    const { navigate } = this.props.userStackNavigation.navigation;

    navigate('DeleteAccount', {
      deleteAccount: this.performDeleteAccount,
    });
  }

  performDeleteAccount() {
    // Dispatch delete action here
  }

  render() {
    const { auth } = this.props;

    let membershipStatus = (
      <View>
        <Text>You are not a member</Text>
        <Button onPress={this.navigateToMembershipPayment.bind(this, false)} title="Pay" accessibilityLabel="Pay" />
      </View>
    );

    if (auth.user.active) {
      membershipStatus = (
        <View>
          <Text>You are a member</Text>
          <Button onPress={this.navigateToMembershipPayment.bind(this, true)} title="Donate" accessibilityLabel="Pay" />
        </View>
      );
    }

    return (
      <ContentWrapper>
        <Card header='Membership' headerPosition='outside'>
          {membershipStatus}
        </Card>
        <Card header='Notifications' headerPosition='outside'>
          <Text>Notification settings here</Text>
        </Card>
        <Card header='Language' headerPosition='outside'>
          <Text>Language</Text>
        </Card>
        <Button onPress={this.onLogout.bind(this)} title="Logout" accessibilityLabel="Logout" />
        <Text style={styles.deleteAccountLink} onPress={this.navigateToDeleteAccount.bind(this)}>Delete account</Text>
      </ContentWrapper>
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

export default connect(mapStateToProps)(Settings);

const styles = {
  deleteAccountLink: {
    alignSelf: 'center',
    marginTop: 5
  }
};