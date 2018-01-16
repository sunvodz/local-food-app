import React from 'react';
import { Text, View } from 'react-native';
import Modal from 'react-native-modal';
import _ from 'lodash';

import { NumberInput, Button, Badge, BadgeWrapper } from 'app/components';

class OrderModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: '1',
      dates: [],
    };
  }

  setQuantity(quantity) {
    this.setState({
      quantity: quantity
    })
  }

  toggleDate(date) {
    let dates = this.state.dates;
    let index = _.indexOf(dates, date);

    if (index !== -1) {
        dates.splice(index, 1);
    } else {
        dates.push(date);
    }

    this.setState({
      dates: dates
    });
  }

  addToCart() {
    console.log('add to cart - dispatch!');
  }

  render() {
    let modalProps = {
      onBackButtonPress: this.props.onClose,
      onBackdropPress: this.props.onClose,
      isVisible: this.props.isVisible
    }

    let dates = _.map(this.props.dates, (date) => {
      let selected = _.includes(this.state.dates, date);

      return <Badge key={date} label={date} selected={selected} onPress={this.toggleDate.bind(this, date)} />;
    });

    return (
      <Modal {...modalProps}>
        <View style={{ flex: 1, backgroundColor: '#fff'}}>
          <Text>ORDER MODAL</Text>
          <BadgeWrapper>{dates}</BadgeWrapper>
          <NumberInput onChangeText={this.setQuantity.bind(this)} value={this.state.quantity} />
          <Button onPress={this.addToCart.bind(this)} title="Add to cart" color="#bc3b1f" />
        </View>
      </Modal>
    );
  }
}

export default OrderModal;
