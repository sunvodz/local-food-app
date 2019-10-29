import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity, StyleSheet, Image, View, Linking, ActivityIndicator } from 'react-native';
import { FontAwesome as Icon } from '@expo/vector-icons';
import moment from 'moment';
import _ from 'lodash';
import Text from 'app/components/Text';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


import { ContentWrapper, Card, Button, Link, NumberInput } from 'app/components';
import { sharedActions, trans } from 'app/shared';
import globalStyle from 'app/styles';

import {startSwish} from 'app/actions/swish'

import {API_URL} from 'app/env.json'

class PayWithSwish extends Component {

  constructor() {
    super();
    this.state = {
      amount: 0
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
    const {amount} = this.state;

    if (amount <= 0) {
      console.error("handle payment of 0 or less");
      return;
    }

    this.props.startSwish(amount);

  }

  render() {

    const { lang, swish } = this.props;

    return (
      <KeyboardAwareScrollView style={styles.container}>
        <NumberInput label={trans('amount', lang)} placeholder={trans('amount_placeholder', lang)} onChangeText={this.onChange.bind(this, 'amount')} />
        <Button onPress={this.onPayment} icon='user' title={trans('donate', lang)} accessibilityLabel={trans('donate', lang)} loading={this.props.membership.paymentInProgress} />
        {swish.loading && <ActivityIndicator size="large" style={{top: '50%'}} color="white" />}
      </KeyboardAwareScrollView>
    );
  }
}

function mapStateToProps(state) {
  const { auth, settings, membership, swish } = state;

  return {
    // auth,
    // settings,
    membership,
    swish,
  }
}

const mapDispatchToProps = {
  startSwish,
 };

export default connect(mapStateToProps, mapDispatchToProps)(PayWithSwish);

let styles = StyleSheet.create({
  container: {
    backgroundColor: globalStyle.primaryColor,
    flex: 1,
    padding: 10,
  },
  // group: {
  //   flex: 1,
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  // },
});

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