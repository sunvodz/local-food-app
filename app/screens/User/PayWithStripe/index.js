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
    }
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
      this.props.navigation.navigate('DonateNothing', {
        lang: this.props.route.params.lang
      });
    } else {
      this.props.dispatch(actions.startStripe(this.props.auth.user.id, this.state, this.props.route.params.lang));
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

  render() {
    const { auth, stripe } = this.props;
    const lang = this.props.route.params.lang;

    // Success
    if (this.state.paymentSuccess) {
      let viewProps = {
        style: {
          alignItems: 'center',
          backgroundColor: globalStyle.mainPrimaryColor,
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
          value={this.state.currency ? this.state.currency : 'EUR'}
        />
      );
    }

    let scrollViewProps = {
      keyboardShouldPersistTaps: 'always',
      enableOnAndroid: true,
      style: {
        backgroundColor: globalStyle.mainPrimaryColor,
      }
    };

    let button = <Button onPress={this.onPayment.bind(this)} title={trans('Donate with card', lang)} />;
    if (stripe.paymentInProgress) {
      button = <ActivityIndicator color="#fff" />;
    }

    return (
      <KeyboardAwareScrollView {...scrollViewProps}>
        <View style={styles.wrapper}>
          <View style={styles.inputGroup}>
            <NumberInput style={textInputGroupItemStyle} label={trans('Amount', lang)} placeholder={trans('Any amount', lang)} onChangeText={this.onChange.bind(this, 'amount')} />
            {currencySelect}
          </View>
          <NumberInput label={trans('Card number', lang)} value={this.state.cardNumber} placeholder={trans('xxxx xxxx xxxx xxxx', lang)} onChangeText={this.onChange.bind(this, 'cardNumber')} />
          <View style={styles.inputGroup}>
            <NumberInput style={textInputGroupItemStyle} label={trans('Month', lang)} placeholder={trans('xx', lang)} onChangeText={this.onChange.bind(this, 'expMonth')} />
            <NumberInput style={textInputGroupItemStyle} label={trans('Year', lang)} placeholder={trans('xx', lang)} onChangeText={this.onChange.bind(this, 'expYear')} />
            <NumberInput style={textInputLastGroupItemStyle} label="CVC" placeholder={trans('xxx', lang)} onChangeText={this.onChange.bind(this, 'cvc')} />
          </View>
        </View>
        {button}
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
    backgroundColor: globalStyle.mainPrimaryColor,
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
  inputGroup: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectWrapper: {
    backgroundColor: '#fff',
    flex: 1,
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
