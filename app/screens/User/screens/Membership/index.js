import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { sharedActions, trans } from 'app/shared';
import { NumberInput, Button, ScreenHeader } from 'app/components';
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
    }
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
        justifyContent: 'center',
        backgroundColor: globalStyle.primaryColor,
        flex: 1,
      }
    }

    if (!auth.user.active) {
      return (
        <View style={{flex: 1}}>
          <ScreenHeader title={trans('membership', lang)} left navigation={this.props.navigation} />
          <View {...viewProps}>
            <Text style={styles.infoText}>{trans('resend_email_info_part_1', lang)}</Text>
            <Text style={styles.infoText}>{trans('resend_email_info_part_2', lang)}</Text>
            <Button style={buttonStyle} onPress={this.onResendEmail.bind(this)} icon='user' title={trans('resend_email', lang)} accessibilityLabel={trans('resend_email', lang)} loading={this.props.membership.paymentInProgress} />
          </View>
        </View>
      );
    }

    if (this.state.paymentSuccess) {
      return (
        <View style={{flex: 1}}>
          <ScreenHeader title={trans('membership', lang)} left navigation={this.props.navigation} />
          <View {...viewProps}>
            <Text style={styles.infoText}>{trans('payment_success', lang)}</Text>
          </View>
        </View>
      );
    }

    return (
      <View>
        <ScreenHeader title={trans('membership', lang)} left navigation={this.props.navigation} />
        <KeyboardAwareScrollView {...scrollViewProps}>
          <Image style={styles.logo} source={require('../../../../../assets/images/logo-white.png')} />
          <View style={styles.wrapper}>
            <Text style={styles.infoText}>{trans('membership_info_part_1', lang)}</Text>
            <Text style={styles.infoText}>{trans('membership_info_part_2', lang)}</Text>
            <Text style={styles.infoText}>{trans('membership_info_part_3', lang)}</Text>
            <NumberInput label={trans('amount', lang)} placeholder={trans('amount_placeholder', lang)} onChangeText={this.onChange.bind(this, 'amount')} />
            <NumberInput label={trans('card_number', lang)} placeholder={trans('card_number_placeholder', lang)} onChangeText={this.onChange.bind(this, 'cardNumber')} />
            <View style={styles.group}>
              <NumberInput style={textInputGroupItemStyle} label={trans('month', lang)} placeholder={trans('month_placeholder', lang)} onChangeText={this.onChange.bind(this, 'expMonth')} />
              <NumberInput style={textInputGroupItemStyle} label={trans('year', lang)} placeholder={trans('year_placeholder', lang)} onChangeText={this.onChange.bind(this, 'expYear')} />
              <NumberInput style={textInputLastGroupItemStyle} label="CVC" placeholder="123" onChangeText={this.onChange.bind(this, 'cvc')} />
            </View>
            <Button style={buttonStyle} onPress={this.onPayment.bind(this)} icon='user' title={trans('become_a_member', lang)} accessibilityLabel={trans('become_a_member', lang)} loading={this.props.membership.paymentInProgress} />
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
  infoText: {
    color: '#fff',
    fontFamily: 'montserrat-regular',
    marginBottom: 15,
    textAlign: 'center',
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

const buttonStyle = {
  button: {
    backgroundColor: '#ff9800',
    marginTop: 15,
  },
  title: {
    color: '#333',
  },
  icon: {
    color: '#333',
  }
};
