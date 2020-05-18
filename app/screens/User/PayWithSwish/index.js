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
      paymentSuccess: false,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.auth.user.membership_payments.length > prevProps.auth.user.membership_payments.length) {
      this.setState({paymentSuccess: true});
    }
  }

  payWithSwish() {
    const { navigation } = this.props
    navigation.navigate('PayWithSwish')
  }

  onChange(type, value) {
    let state = this.state;
    state[type] = value;
    this.setState(state);
  }

  onPayment = async () => {
    const { amount } = this.state;

    if (amount == 0) {
      this.props.navigation.navigate('DonateNothing', {
        lang: this.props.route.params.lang
      });
    } else {
      this.props.dispatch(actions.startSwish(this.props.auth.user.id, amount, this.props.route.params.lang));
    }
  }

  render() {
    const { auth, swish } = this.props;
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

    let scrollViewProps = {
      contentContainerStyle: {
        paddingBottom: 100,
      },
      keyboardShouldPersistTaps: 'always',
      enableOnAndroid: true,
      style: {
        backgroundColor: globalStyle.mainPrimaryColor,
      }
    };

    return (
      <KeyboardAwareScrollView {...scrollViewProps}>
        <View style={styles.wrapper}>
          <NumberInput label={trans('Amount', lang)} placeholder={trans('Any amount', lang)} onChangeText={this.onChange.bind(this, 'amount')} />
          <Button onPress={this.onPayment} title={trans('Donate with swish', lang)} loading={this.props.swish.paymentInProgress} />
        </View>
        {swish.loading && <ActivityIndicator color="#fff" />}
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
    backgroundColor: globalStyle.mainPrimaryColor,
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
  icon: {
    color: '#fff',
    fontSize: 50,
    marginBottom: 10,
  }
};
