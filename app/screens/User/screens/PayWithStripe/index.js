import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import _ from 'lodash';

import { sharedActions, trans } from 'app/shared';
import * as actions from './actions';
import { NumberInput, Button, SelectInput } from 'app/components';
import globalStyle from 'app/styles';
import { FontAwesome as Icon } from '@expo/vector-icons';

class PayWithStripe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: null,
      cardNumber: null,
      expYear: null,
      expMonth: null,
      cvc: null,
      paymentSuccess: false,
      currency: props.auth.user.currency ? props.auth.user.currency : 'EUR',
      donateNothing: false,
    }

    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.onDonateNothing = this.onDonateNothing.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(actions.getCurrencies());
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.auth.user.membership_payments.length > prevProps.auth.user.membership_payments.length) {
      this.setState({paymentSuccess: true});
    }
  }

  onChange(type, value) {
    if (type === 'cardNumber') {
      value = this.formatCardNumber(value);
    }

    let state = this.state;
    state[type] = value;
    this.setState(state);
  }

  onPayment() {
    if (this.state.amount == 0) {
      this.setState({donateNothing: true});
    } else {
      this.props.dispatch(actions.startStripe(this.props.auth.user.id, this.state));
    }
  }

  onCurrencyChange(currency) {
    this.setState({currency: currency});
  }

  formatCardNumber(value) {
    var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    var matches = v.match(/\d{4,16}/g);
    var match = matches && matches[0] || '';
    var parts = [];
    for (i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value
    }
  }

  onChangeAmount() {
    this.setState({
      donateNothing: false,
    });
  }

  onDonateNothing() {
    this.props.dispatch(sharedActions.donateNothing(this.props.auth.user.id));
  }

  render() {
    const { auth, stripe, lang } = this.props;

    // Success
    if (this.state.paymentSuccess) {
      let viewProps = {
        style: {
          alignItems: 'center',
          backgroundColor: globalStyle.primaryColor,
          flex: 1,
          justifyContent: 'center',
          paddingHorizontal: 15,
        }
      }

      return (
        <View style={styles.container}>
          <View {...viewProps}>
            <Icon style={styles.icon} name='birthday-cake' />
            <Text style={styles.infoText}>{trans('Thank you for your donation!', lang)}</Text>
          </View>
        </View>
      );
    }

    // Donate nothing
    if (this.state.donateNothing) {
      return (
        <View style={styles.container}>
          <View style={{alignItems: 'center'}}>
            <Icon style={styles.icon} name='frown-o' />
            <Text style={styles.infoText}>{trans('Local Food Nodes is built on a gift based enonomy. By supporting with a donation, free of choice, you co-finance efforts to make the food more local again.', lang)}</Text>
            <Button style={styles.button} onPress={this.onChangeAmount} title={trans('Change amount', lang)} />
            <Text style={styles.donateNothing} onPress={this.onDonateNothing}>{trans('Donate nothing', lang)}</Text>
            {auth.paymentInProgress && <ActivityIndicator size="large" style={{top: '50%'}} color="white" />}
          </View>
        </View>
      );
    }

    let currencySelect = null;
    if (this.props.stripe.currencies) {
      let currencies = _(this.props.stripe.currencies).map((currency, label) => {
        return {
          value: label,
          label: label,
          key: label,
        }
      });

      currencySelect = (
        <SelectInput
          label={trans('Select currency', lang)}
          placeholder={{label: trans('Select currency', lang), value: null}}
          items={_.toArray(currencies)}
          onValueChange={this.onCurrencyChange.bind(this)}
          hideIcon={true}
          value={this.state.currency ? this.state.currency : 'EUR'} />
      );
    }

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

    return (
      <KeyboardAwareScrollView {...scrollViewProps}>
        <View style={styles.wrapper}>
          <View style={styles.group}>
            <NumberInput style={textInputGroupItemStyle} label={trans('Amount', lang)} placeholder={trans('Any amount', lang)} onChangeText={this.onChange.bind(this, 'amount')} />
            {currencySelect}
          </View>
          <NumberInput label={trans('Card number', lang)} value={this.state.cardNumber} placeholder={trans('xxxx xxxx xxxx xxxx', lang)} onChangeText={this.onChange.bind(this, 'cardNumber')} />
          <View style={styles.group}>
            <NumberInput style={textInputGroupItemStyle} label={trans('Month', lang)} placeholder={trans('xx', lang)} onChangeText={this.onChange.bind(this, 'expMonth')} />
            <NumberInput style={textInputGroupItemStyle} label={trans('Year', lang)} placeholder={trans('xx', lang)} onChangeText={this.onChange.bind(this, 'expYear')} />
            <NumberInput style={textInputLastGroupItemStyle} label="CVC" placeholder="xxx" onChangeText={this.onChange.bind(this, 'cvc')} />
          </View>
          <View style={{marginTop: 15}}>
            <Button onPress={this.onPayment.bind(this)} title={trans('Donate with card', lang)} loading={this.props.stripe.paymentInProgress} />
          </View>
        </View>
        {stripe.paymentInProgress && <ActivityIndicator size="large" color="white" />}
      </KeyboardAwareScrollView>
    );
  }
}

function mapStateToProps(state) {
  const { stripe, auth } = state;

  return {
    stripe,
    auth,
  }
}

export default connect(mapStateToProps)(PayWithStripe);

let styles = {
  container: {
    backgroundColor: globalStyle.primaryColor,
    flex: 1,
    padding: 10,
  },
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
  },
  donateNothing: {
    color: '#fff',
    fontFamily: 'montserrat-regular',
    lineHeight: 18,
    textAlign: 'center',
  },
  icon: {
    color: '#fff',
    fontSize: 50,
    marginBottom: 10,
  },
  button: {
    button: {
      marginBottom: 10,
      marginTop: 10,
    }
  },
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
