import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Picker, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import _ from 'lodash';

import { ContentWrapper, Card, Button, Link } from 'app/components';
import { sharedActions, trans } from 'app/shared';
import * as actions from './actions';

class Settings extends Component {
  componentDidMount() {
    this.props.dispatch(actions.fetchLanguages());
  }

  onLogout() {
    this.props.dispatch(sharedActions.logout());
  }

  navigateToMembershipPayment(donation) {
    const { navigate } = this.props.userStackNavigation;

    navigate('Membership');
  }

  navigateToDeleteAccount() {
    const { navigate } = this.props.userStackNavigation;

    navigate('DeleteAccount', {
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

  render() {
    const { auth } = this.props;

    let membershipStatus = <Text>{trans('not_a_member', this.props.lang)}</Text>;
    let membershipStatusAction = <Link onPress={this.navigateToMembershipPayment.bind(this, false)} title={trans('become_a_member', this.props.lang)} accessibilityLabel="Become a member" />;

    if (auth.user.active) {
      let payments = auth.user.membership_payments_relationship;
      let latestPayment = payments[payments.length - 1];
      let membershipUntil = moment(latestPayment).add(1, 'y');

      membershipStatus = <Text>{trans('member_until', this.props.lang)} {membershipUntil.format('YYYY-MM-DD')}</Text>;
      membershipStatusAction = <Link onPress={this.navigateToMembershipPayment.bind(this, true)} title={trans('renew_membership', this.props.lang)} accessibilityLabel="Renew membership" />;
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

    return (
      <ContentWrapper>
        <Card header={trans('membership', this.props.lang)} headerPosition='outside' footer={membershipStatusAction} style={{card: {marginBottom: 0}}}>
          {membershipStatus}
        </Card>
        <Card header={trans('select_language', this.props.lang)} headerPosition='outside'>
          {languageItems}
        </Card>
        <Button onPress={this.onLogout.bind(this)} icon='sign-out' title={trans('logout', this.props.lang)} accessibilityLabel="Logout" />
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
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  languageItemSelected: {
    color: '#bf360c'
  },
  text: {
    fontFamily: 'montserrat-regular',
  }
};
