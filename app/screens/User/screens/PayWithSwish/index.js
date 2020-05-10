import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FontAwesome as Icon } from '@expo/vector-icons';

import { Button, NumberInput, Link } from 'app/components';
import { trans } from 'app/shared';
import globalStyle from 'app/styles';
import { sharedActions } from 'app/shared';

import * as actions from './actions';

class PayWithSwish extends Component {

  constructor(props) {
    super(props);
    this.state = {
      amount: null,
      donateNothing: false,
      paymentSuccess: false,
    }

    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.onDonateNothing = this.onDonateNothing.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.auth.user.membership_payments.length > prevProps.auth.user.membership_payments.length) {
      this.setState({paymentSuccess: true});
    }
  }

  payWithSwish() {
    const { navigation } = this.props
    navigation.navigate('payWithSwish')
  }

  onChange(type, value) {
    let state = this.state;
    state[type] = value;
    this.setState(state);
  }

  onPayment = async () => {
    const { amount } = this.state;

    if (amount == 0) {
      this.setState({donateNothing: true});
    } else {
      this.props.dispatch(actions.startSwish(this.props.auth.user.id, amount));
    }
  }

  onChangeAmount() {
    this.setState({
      donateNothing: false,
    });
  }

  onDonateNothing() {
    this.props.dispatch(sharedActions.donationActions.donateNothing(this.props.auth.user.id));
  }

  render() {
    const { lang, swish, auth } = this.props;

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
            <Button style={styles.button}  onPress={this.onChangeAmount} title={trans('Change amount', lang)} />
            <Text style={styles.donateNothing} onPress={this.onDonateNothing}>{trans('Donate nothing', lang)}</Text>
            {auth.paymentInProgress && <ActivityIndicator size="large" style={{top: '50%'}} color="white" />}
          </View>
        </View>
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
          <NumberInput label={trans('Amount', lang)} placeholder={trans('Any amount', lang)} onChangeText={this.onChange.bind(this, 'amount')} />
          <Button onPress={this.onPayment} title={trans('Donate with swish', lang)} loading={this.props.swish.paymentInProgress} />
        </View>
        {swish.loading && <ActivityIndicator size="large" color="white" />}
      </KeyboardAwareScrollView>
    );
  }
}

function mapStateToProps(state) {
  const { auth, swish } = state;

  return {
    auth,
    swish,
  }
}

export default connect(mapStateToProps)(PayWithSwish);

let styles = {
  container: {
    backgroundColor: globalStyle.primaryColor,
    flex: 1,
    padding: 10,
  },
  wrapper: {
    padding: 15,
  },
  infoText: {
    color: '#fff',
    fontFamily: 'montserrat-regular',
    marginBottom: 15,
  },
  button: {
    button: {
      marginBottom: 10,
      marginTop: 10,
    }
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
  }
};
