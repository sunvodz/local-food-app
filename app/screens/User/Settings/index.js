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
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      title: trans('Settings', this.props.system.lang)
    })

    this.props.dispatch(sharedActions.locationActions.getLocationPermission(this.props.system.lang));
  }

  onLogout() {
    this.props.dispatch(sharedActions.userActions.logout());
  }

  navigateToPaymentSelect() {
    this.props.navigation.navigate('PaymentSelect', {
      lang: this.props.system.lang
    });
  }

  navigateToFAQ() {
    this.props.navigation.navigate('FAQ', {
      lang: this.props.system.lang
    });
  }

  navigateToDeleteAccount() {
    this.props.navigation.navigate('DeleteAccount', {
      deleteAccount: this.performDeleteAccount,
    });
  }

  performDeleteAccount() {
    // Dispatch delete action here
  }

  changeLanguage(lang) {
    this.props.dispatch(sharedActions.systemActions.setLanguage(lang));
  }

  onRefresh() {
    this.props.dispatch(sharedActions.userActions.loadUser(true, this.props.system.lang)); // Refreshing
  }

  onResendEmail() {
    this.props.dispatch(sharedActions.userActions.resendEmail(this.props.system.lang));
  }

  enablePushNotifications() {
    this.props.dispatch(sharedActions.notificationActions.registerForPushNotificationsAsync(this.props.auth.email, this.props.system.lang));
  }

  disablePushNotifications() {
    this.props.dispatch(sharedActions.notificationActions.unregisterForPushNotificationsAsync(this.props.auth.user.push_token[0].id, this.props.system.lang));
  }

  enableLocation() {
    this.props.dispatch(sharedActions.locationActions.askLocationPermission(true, this.props.system.lang));
  }

  navigateToLanguageSelect() {
    this.props.navigation.navigate('LanguageSelect', {
      lang: this.props.system.lang
    });
  }

  render() {
    const { auth } = this.props;
    const lang = this.props.system.lang;

    let donationStatus = <Text style={styles.text}>{trans('You must make a donation before you can order products on Local Food Nodes. By supporting with a donation, free of choice, you co-finance efforts to make the food more local again.', lang)}</Text>;
    let donationStatusAction = <Link onPress={this.navigateToPaymentSelect.bind(this, false)} title={trans('Make a donation', lang)} />;
    let payments = auth.user.membership_payments;

    if (!auth.user.active) {
      donationStatus = <Text style={styles.text}>{trans('You have to verify your email address before you can make a donation and order products.', lang)}</Text>;
      donationStatusAction = <Link onPress={this.onResendEmail.bind(this)} title={trans('Resend verification email', lang)} />;
    } else if (payments.length > 0) {
      let lastPayment = payments[0];
      let membershipUntil = moment(lastPayment.expire_at);
      donationStatus = <Text style={styles.text}>{trans('Your donation is valid until', lang)} {membershipUntil.format('YYYY-MM-DD')}</Text>;
      donationStatusAction = <Link onPress={this.navigateToPaymentSelect.bind(this, true)} title={trans('Make a donation', lang)} />;
    }

    let languageSelect = (
      <TouchableOpacity style={globalStyle.settingsRow} onPress={this.navigateToLanguageSelect.bind(this)}>
        <Text style={styles.text}>{trans('Change language', lang)}</Text>
        <Icon name="chevron-right" />
      </TouchableOpacity>
    );

    let helpLink = <Link onPress={this.navigateToFAQ.bind(this, true)} title={trans('FAQ', lang)} />;

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
        <Card headerPosition='outside' footer={donationStatusAction} style={{card: {marginBottom: 0}}}>
          {donationStatus}
        </Card>
        {languageSelect}
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
  const { auth, settings, system } = state;

  return {
    auth,
    settings,
    system,
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
    color: globalStyle.mainPrimaryColor
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
    color: globalStyle.mainPrimaryColor,
  }
};
