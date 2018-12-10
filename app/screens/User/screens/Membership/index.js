import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Image } from 'react-native';
import { Switch } from 'react-native-switch';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import _ from 'lodash';

import { sharedActions, trans } from 'app/shared';
import { NumberInput, Button, ScreenHeader, SelectInput } from 'app/components';
import globalStyle from 'app/styles';

class Membership extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: null,
      cardNumber: null,
      expYear: null,
      expMonth: null,
      cvc: null,
      paymentSuccess: false,
      recurring: false,
      currency: props.auth.user.currency ? props.auth.user.currency : 'EUR',
    }
  }

  componentDidMount() {
    this.props.dispatch(sharedActions.getCurrencies());
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.auth.user.membership_payments_relationship.length > prevProps.auth.user.membership_payments_relationship.length) {
      this.setState({paymentSuccess: true});
    }
  }

  onChange(type, value) {
    let state = this.state;
    state[type] = value;
    this.setState(state);
  }

  onPayment() {
    this.props.dispatch(sharedActions.processPayment(this.state));
  }

  onResendEmail() {
    this.props.dispatch(sharedActions.resendEmail());
  }

  onCurrencyChange(currency) {
    this.setState({currency: currency});
  }

  onRecurringChange(value) {
    this.setState({recurring: !this.state.recurring});
  }

  render() {
    const { auth, membership, navigation, lang } = this.props;

    let scrollViewProps = {
      contentContainerStyle: {
        paddingBottom: 100,
      },
      keyboardShouldPersistTaps: 'always',
      enableOnAndroid: true,
      style: {
        backgroundColor: globalStyle.primaryColor,
      }
    };

    let viewProps = {
      style: {
        alignItems: 'center',
        backgroundColor: globalStyle.primaryColor,
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 15,
      }
    }

    if (!auth.user.active) {
      return (
        <View style={{flex: 1}}>
          <ScreenHeader title={trans('membership', lang)} left navigation={this.props.navigation} />
          <View {...viewProps}>
            <Text style={styles.infoHeader}>{trans('resend_email_info_header', lang)}</Text>
            <Text style={styles.infoText}>{trans('resend_email_info_part_1', lang)}</Text>
            <Text style={styles.infoText}>{trans('resend_email_info_part_2', lang)}</Text>
            <Button onPress={this.onResendEmail.bind(this)} icon='user' title={trans('resend_email', lang)} accessibilityLabel={trans('resend_email', lang)} loading={this.props.membership.paymentInProgress} />
          </View>
        </View>
      );
    }

    if (this.state.paymentSuccess) {
      return (
        <View style={{flex: 1}}>
          <ScreenHeader title={trans('membership', lang)} left navigation={this.props.navigation} />
          <View {...viewProps}>
            <Text style={styles.infoHeader}>{trans('payment_success_header', lang)}</Text>
            <Text style={styles.infoText}>{trans('payment_success', lang)}</Text>
          </View>
        </View>
      );
    }

    let currencySelect = null;
    if (this.props.membership.currencies) {
      let currencies = _(this.props.membership.currencies).map((currency, label) => {
        return {
          value: label,
          label: label,
          key: label,
        }
      });

      currencySelect = (
        <SelectInput
          label={trans('select_currency', lang)}
          placeholder={{label: trans('select_currency', lang), value: null}}
          items={_.toArray(currencies)}
          onValueChange={this.onCurrencyChange.bind(this)}
          hideIcon={true}
          style={styles.select}
          value={this.state.currency ? this.state.currency : 'EUR'} />
      );
    }

    return (
      <View>
        <ScreenHeader title={trans('membership', lang)} left navigation={this.props.navigation} />
        <KeyboardAwareScrollView {...scrollViewProps}>
          <Image style={styles.logo} source={require('../../../../../assets/images/logo-white.png')} />
          <View style={styles.wrapper}>
            <Text style={styles.infoHeader}>{trans('membership_info_header', lang)}</Text>
            <Text style={styles.infoText}>{trans('membership_info_part_1', lang)}</Text>
            <Text style={styles.infoText}>{trans('membership_info_part_2', lang)}</Text>
            <View style={styles.group}>
              <NumberInput style={textInputGroupItemStyle} label={trans('amount', lang)} placeholder={trans('amount_placeholder', lang)} onChangeText={this.onChange.bind(this, 'amount')} />
              {currencySelect}
            </View>
            <NumberInput label={trans('card_number', lang)} placeholder={trans('card_number_placeholder', lang)} onChangeText={this.onChange.bind(this, 'cardNumber')} />
            <View style={styles.group}>
              <NumberInput style={textInputGroupItemStyle} label={trans('month', lang)} placeholder={trans('month_placeholder', lang)} onChangeText={this.onChange.bind(this, 'expMonth')} />
              <NumberInput style={textInputGroupItemStyle} label={trans('year', lang)} placeholder={trans('year_placeholder', lang)} onChangeText={this.onChange.bind(this, 'expYear')} />
              <NumberInput style={textInputLastGroupItemStyle} label="CVC" placeholder="123" onChangeText={this.onChange.bind(this, 'cvc')} />
            </View>
            <Text style={{color: '#fff', fontFamily: 'montserrat-semibold', marginBottom: 10}}>{ trans('donation_type', lang)}</Text>
            <View style={styles.group}>
              <Switch
                value={this.state.recurring}
                onValueChange={this.onRecurringChange.bind(this)}
                disabled={false}
                backgroundActive={'#d58067'}
                backgroundInactive={'#d58067'}
                circleActiveColor={'#fff'}
                circleInActiveColor={'#fff'}
                circleBorderWidth={0}
                circleSize={24}
                />
              <Text style={{color: '#fff', flex: 1, marginLeft: 10, marginTop: 5, fontFamily: 'montserrat-semibold'}}>{this.state.recurring ? trans('membership_monthly', lang) : trans('membership_annual', lang)}</Text>
            </View>
            <View style={{marginTop: 15}}>
              <Button onPress={this.onPayment.bind(this)} icon='user' title={trans('become_a_member', lang)} accessibilityLabel={trans('become_a_member', lang)} loading={this.props.membership.paymentInProgress} />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { membership, auth } = state;

  return {
    membership,
    auth,
  }
}

export default connect(mapStateToProps)(Membership);

let styles = {
  logo: {
    height: 60,
    width: 70,
    margin: 15,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  infoHeader: {
    color: '#fff',
    fontFamily: 'montserrat-semibold',
    marginBottom: 15,
    textAlign: 'center',
  },
  infoText: {
    color: '#fff',
    fontFamily: 'montserrat-regular',
    marginBottom: 15,
    width: '100%',
  },
  wrapper: {
    padding: 15,
  },
  header: {
    color: '#fff',
    fontFamily: 'montserrat-semibold',
  },
  toggleLink: {
    alignSelf: 'center',
    color: '#fff',
    fontFamily: 'montserrat-regular',
    paddingTop: 5,
    paddingBottom: 0,
    textDecorationLine: 'underline',
  },
  group: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectWrapper: {
    backgroundColor: '#fff',
    flex: 1,
  }
};

const textInputGroupItemStyle = {
  label: {
    color: '#fff',
    fontFamily: 'montserrat-semibold',
  },
  textInput: {
    backgroundColor: '#fff',
    borderWidth: 0,
    flex: 1,
    marginRight: 15,
  }
};

const textInputLastGroupItemStyle = {
  label: {
    color: '#fff',
    fontFamily: 'montserrat-semibold',
  },
  textInput: {
    backgroundColor: '#fff',
    borderWidth: 0,
    flex: 1,
    marginRight: 0,
  }
};
