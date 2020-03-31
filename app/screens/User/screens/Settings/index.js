import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, TouchableOpacity } from 'react-native';
import { FontAwesome as Icon } from '@expo/vector-icons';
import moment from 'moment';
import _ from 'lodash';

import { ContentWrapper, Card, Button, Link } from 'app/components';
import { sharedActions, trans } from 'app/shared';
import * as actions from './actions';
import globalStyle from 'app/styles';

class Settings extends Component {
  componentDidMount() {
    // this.props.dispatch(actions.fetchLanguages());
    this.props.dispatch(actions.getPushToken());
  }

  onLogout() {
    this.props.dispatch(sharedActions.logout());
  }

  navigateToMembershipPayment(donation) {
    const { navigate } = this.props.navigation;

    navigate('paymentSelect');
  }

  navigateToHelp(donation) {
    const { navigate } = this.props.navigation;

    navigate('help');
  }

  navigateToDeleteAccount() {
    const { navigate } = this.props.navigation;

    navigate('deleteAccount', {
      deleteAccount: this.performDeleteAccount,
    });
  }

  performDeleteAccount() {
    // Dispatch delete action here
  }

  changeLanguage(lang) {
    this.props.dispatch(actions.setLanguage(lang));
  }

  adjustFrame(style) {
    style.left = 20;
    style.right = 20;
    return style;
  }

  onRefresh() {
    this.props.dispatch(sharedActions.loadUser(true)); // Refreshing
  }

  onResendEmail() {
    this.props.dispatch(sharedActions.resendEmail());
  }

  render() {
    const { auth, lang } = this.props;

    let membershipStatus = <Text style={styles.text}>{trans('You must make a donation before you can order products on Local Food Nodes. By supporting with a donation, free of choice, you co-finance efforts to make the food more local again.', lang)}</Text>;
    let membershipStatusAction = <Link onPress={this.navigateToMembershipPayment.bind(this, false)} title={trans('Make a donation', lang)} />;
    let payments = auth.user.membership_payments;

    if (!auth.user.active) {
      membershipStatus = <Text style={styles.text}>{trans('You have to verify your email address before you can make a donation and order products.', lang)}</Text>;
      membershipStatusAction = <Link onPress={this.onResendEmail.bind(this)} title={trans('Resend verification email', lang)} />;
    } else if (payments.length > 0) {
      let lastPayment = payments[0];
      let membershipUntil = moment(lastPayment.created_at).add(1, 'y');
      membershipStatus = <Text style={styles.text}>{trans('Donation valid until', lang)} {membershipUntil.format('YYYY-MM-DD')}</Text>;
      membershipStatusAction = <Link onPress={this.navigateToMembershipPayment.bind(this, true)} title={trans('Make a donation', lang)} />;
    }

    let availableLanguages = {
      sv: 'Svenska',
      en: 'English',
    };

    let languageItems = _.map(availableLanguages, (name, lang) => {
      let selected = auth.user.language === lang ? <Icon name='check' /> : null;

      return (
        <TouchableOpacity style={styles.languageItem} key={lang} onPress={this.changeLanguage.bind(this, lang)}>
          <Text style={styles.text}>{name}</Text>
          {selected}
        </TouchableOpacity>
      );
    });

    let loggedInAs = `${trans('Logged in as', lang)} ${auth.user.name}`;

    let helpLink = <Link onPress={this.navigateToHelp.bind(this, true)} title={trans('Help', lang)} />;

    return (
      <ContentWrapper onRefresh={this.onRefresh.bind(this)} refreshing={auth.refreshing}>
        <Card header={loggedInAs} headerPosition='outside' footer={membershipStatusAction} style={{card: {marginBottom: 0}}}>
          {membershipStatus}
        </Card>
        <Card header={trans('Select language', lang)} headerPosition='outside'>
          {languageItems}
        </Card>
        <Card header={trans('Help', lang)} headerPosition='outside' footer={helpLink}>
          <Text>{trans('We have created a small FAQ for you. If there is anything else you need help with please contact us on info@localfoodnodes.org.', lang)}</Text>
        </Card>
        {/* <Text>Token: {this.props.settings.pushToken}</Text> */}
        <Button onPress={this.onLogout.bind(this)} icon='sign-out' title={trans('Logout', lang)} />
        {/*<Text style={styles.deleteAccountLink} onPress={this.navigateToDeleteAccount.bind(this)}>Delete account</Text>*/}
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

let styles = {
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
    elevation: 0,
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
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  languageItemSelected: {
    color: globalStyle.primaryColor
  },
  text: {
    fontFamily: 'montserrat-regular',
  },
  helpWrapper: {
    bottom: 15,
    position: 'absolute',
    right: 15,
  },
  help: {
    color: globalStyle.primaryColor,
  }
};
