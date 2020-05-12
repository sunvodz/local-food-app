import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome as Icon } from '@expo/vector-icons';
import moment from 'moment/min/moment-with-locales';
import _ from 'lodash';

import { ContentWrapper, Card, Button, Link } from 'app/components';
import { sharedActions, trans } from 'app/shared';
import * as actions from './actions';
import globalStyle from 'app/styles';

class Settings extends Component {
  componentDidMount() {
    this.props.dispatch(sharedActions.locationActions.getLocationPermission());
  }

  onLogout() {
    this.props.dispatch(sharedActions.userActions.logout());
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
    this.props.dispatch(sharedActions.userActions.loadUser(true)); // Refreshing
  }

  onResendEmail() {
    this.props.dispatch(sharedActions.resendEmail());
  }

  enablePushNotifications() {
    this.props.dispatch(sharedActions.notificationActions.registerForPushNotificationsAsync(this.props.auth.email));
  }

  disablePushNotifications() {
    this.props.dispatch(sharedActions.notificationActions.unregisterForPushNotificationsAsync(this.props.auth.user.push_token[0].id));
  }

  enableLocation() {
    this.props.dispatch(sharedActions.locationActions.askLocationPermission(true));
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
      membershipStatus = <Text style={styles.text}>{trans('Your donation is valid until', lang)} {membershipUntil.format('YYYY-MM-DD')}</Text>;
      membershipStatusAction = <Link onPress={this.navigateToMembershipPayment.bind(this, true)} title={trans('Make a donation', lang)} />;
    }

    let availableLanguages = {
      sv: 'Svenska',
      en: 'English',
    };

    let languageItems = Object.keys(availableLanguages).map((lang) => {
      let selected = auth.user.language === lang ? <Icon name='check' /> : null;

      return (
        <TouchableOpacity style={styles.languageItem} key={lang} onPress={this.changeLanguage.bind(this, lang)}>
          <Text style={styles.text}>{availableLanguages[lang]}</Text>
          {selected}
        </TouchableOpacity>
      );
    });

    let loggedInAs = `${trans('Logged in as', lang)} ${auth.user.email}`;
    let helpLink = <Link onPress={this.navigateToHelp.bind(this, true)} title={trans('Help', lang)} />;

    let togglePushNotifications = null;
    if (!auth.user.push_token || auth.user.push_token.length == 0) {
      togglePushNotifications = <Link onPress={this.enablePushNotifications.bind(this)} title={trans('Enable push notifications', lang)} />;
    } else {
      togglePushNotifications = <Link onPress={this.disablePushNotifications.bind(this)} title={trans('Disable push notifications', lang)} />;
    }

    let locationText = trans('You have granted permission for Local Food App to use your position. Disable the use of your location in your phones settings.', lang);
    let toggleLocation = null;

    if (auth.locationPermission !== 'granted') {
      locationText = trans('Local Food App is using your location to automatically show nodes close to you on the map.', lang);
      toggleLocation = <Link onPress={this.enableLocation.bind(this)} title={trans('Enable location', lang)} />;
    }

    return (
      <ContentWrapper onRefresh={this.onRefresh.bind(this)} refreshing={auth.refreshing}>
        <Card header={loggedInAs} headerPosition='outside' footer={membershipStatusAction} style={{card: {marginBottom: 0}}}>
          {membershipStatus}
        </Card>
        <Card header={trans('Select language', lang)} headerPosition='outside'>
          {languageItems}
        </Card>
        <Card header={trans('Permissions', lang)} headerPosition='outside'>
          <View style={{marginBottom: 15}}>
            <Text style={[styles.text, {marginBottom: 15}]}>{trans('Local Food App is using push notifications to notify you when you have orders to pickup and other important information.', lang)}</Text>
            {togglePushNotifications}
          </View>
          <View style={{marginTop: 5, paddingTop: 15, borderTopWidth: 1, borderColor: '#ddd'}}>
            <Text style={[styles.text, {marginBottom: 15}]}>{locationText}</Text>
            {toggleLocation}
          </View>
        </Card>
        <Card header={trans('Help', lang)} headerPosition='outside' footer={helpLink}>
          <Text style={styles.text}>{trans('We have created a small FAQ for you. If there is anything you need help with please contact us on info@localfoodnodes.org.', lang)}</Text>
        </Card>
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
