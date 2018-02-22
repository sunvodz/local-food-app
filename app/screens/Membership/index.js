import React, { Component } from 'react';
import { Text, View } from 'react-native';
import _ from 'lodash';

import { sharedActions } from 'app/shared';
import { ContentWrapper, TextInput, NumberInput, Card, Button } from 'app/components';

export default class MembershipScreen extends Component {
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
    return (
      <Card header="Bli medlem på Local Food Nodes" headerPosition="outside">

        <Text>Innan du kan handla på Local Food Nodes behöver du bli medlem. Betala enkelt ditt medlemskap här.</Text>

        <NumberInput label="Amount" placeholder="Valfri summa" onChangeText={this.onChange.bind(this, 'amount')} />
        <NumberInput label="Card number" placeholder="4242 4242 4242 4242" onChangeText={this.onChange.bind(this, 'cardNumber')} />
        <View style={styles.group}>
            <NumberInput style={styles.groupItem} label="Expire year" placeholder="2020" onChangeText={this.onChange.bind(this, 'expYear')} />
            <NumberInput style={styles.groupItem} label="Expire month" placeholder="01" onChangeText={this.onChange.bind(this, 'expMonth')} />
            <NumberInput style={[styles.groupItem, styles.groupItemLast]} label="CVC" placeholder="123" onChangeText={this.onChange.bind(this, 'cvc')} />
        </View>
        <Button onPress={this.onPayment.bind(this)} title="Pay" accessibilityLabel="Pay" loading={this.props.membership.paymentInProgress}/>
      </Card>
    );
  }
}

const styles = {
    group: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    groupItem: {
        textInput: {
            flex: 1,
            marginRight: 15,
        }
    },
    groupItemLast: {
        textInput: {
            marginRight: 0
        }
    }
};