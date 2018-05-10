import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import _ from 'lodash';

import { sharedActions } from 'app/shared';
import { NumberInput, Card, Button } from 'app/components';

class Membership extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: null,
      cardNumber: null,
      expYear: null,
      expMonth: null,
      cvc: null,
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

  render() {
    let scrollViewProps = {
      contentContainerStyle: styles.scrollView,
      keyboardShouldPersistTaps: 'always',
      enableOnAndroid: true,
      style: {
        backgroundColor: '#bf360c',
      }
    };

    return (
      <KeyboardAwareScrollView {...scrollViewProps}>
        <Image style={styles.logo} source={require('../../../../../assets/images/logo-white.png')} />
        <View style={styles.wrapper}>
          <Text style={styles.infoText}>Before you can place an order you need to become a member. Pay what you want.</Text>
          <NumberInput style={textInputStyle} label="Amount" placeholder="Valfri summa" onChangeText={this.onChange.bind(this, 'amount')} />
          <NumberInput style={textInputStyle} label="Card number" placeholder="4242 4242 4242 4242" onChangeText={this.onChange.bind(this, 'cardNumber')} />
          <View style={styles.group}>
              <NumberInput style={textInputGroupItemStyle} label="Expire year" placeholder="2020" onChangeText={this.onChange.bind(this, 'expYear')} />
              <NumberInput style={textInputGroupItemStyle} label="Expire month" placeholder="01" onChangeText={this.onChange.bind(this, 'expMonth')} />
              <NumberInput style={textInputLastGroupItemStyle} label="CVC" placeholder="123" onChangeText={this.onChange.bind(this, 'cvc')} />
          </View>
          <Button style={buttonStyle} onPress={this.onPayment.bind(this)} title="Become a member" accessibilityLabel="Become a member" loading={this.props.membership.paymentInProgress} />
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

function mapStateToProps(state) {
  const { membership } = state;

  return {
    membership,
  }
}

export default connect(mapStateToProps)(Membership);

const styles = {
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
    marginHorizontal: 30,
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

const textInputStyle = {
  label: {
    color: '#fff',
    fontFamily: 'montserrat-semibold',
  },
  textInput: {
    backgroundColor: '#fff',
    borderWidth: 0,
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
    backgroundColor: '#fff',
  },
  title: {
    color: '#333',
    fontFamily: 'montserrat-semibold',
  },
};
