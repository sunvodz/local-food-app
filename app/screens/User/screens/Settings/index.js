import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Picker } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown'

import { ContentWrapper, Card, Button } from 'app/components';
import { sharedActions } from 'app/shared';
import * as actions from './actions';

class Settings extends Component {
  componentDidMount() {
    this.props.dispatch(actions.fetchLanguages());
  }

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
    console.log('Delete account');
  }

  changeLanguage() {
    console.log('Change langauge');
  }

  adjustFrame(style) {
    style.left = 20;
    style.right = 20;
    return style;
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
          <ModalDropdown options={['option 1', 'option 2']} style={styles.modalDropdownStyle} dropdownStyle={styles.modalDropdownDropdownStyle} dropdownTextStyle={styles.modalDropdownDropdownTextStyle} dropdownTextHighlightStyle={styles.dropdownTextHighlightStyle} adjustFrame={this.adjustFrame.bind(this)} onSelect={this.changeLanguage.bind(this)}>
            <Text style={styles.modalDropdownTextStyle}>Select language</Text>
          </ModalDropdown>
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
  },
  modalDropdownStyle: {
  },
  modalDropdownTextStyle: {
    fontFamily: 'montserrat-regular',
  },
  modalDropdownDropdownStyle: {
    borderWidth: 0,
    elevation: 2,
    margin: 0,
    shadowOffset:{
      width: 0,
      height: 0,
    },
    shadowColor: '#ccc',
    shadowOpacity: 1.0,
  },
  modalDropdownDropdownTextStyle: {
    color: '#333',
    fontFamily: 'montserrat-regular',
    fontSize: 16,
  },
  dropdownTextHighlightStyle: {
    backgroundColor: 'blue',
  }
};
