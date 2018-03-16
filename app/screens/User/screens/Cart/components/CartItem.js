import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import _ from 'lodash';

import { Card, Text, Picker } from 'app/components';

export default class CartItem extends React.Component {
  removeCartItem() {
    this.props.onRemove(this.props.data.id);
  }

  onChange(newValue) {
    this.props.onUpdate(this.props.data.id, newValue);
  }

  render() {
    const { data } = this.props;
    const cartItem = data.cart_item_relationship[0];

    let quantityItems = _.range(1, 99).map(number => {
      return <Picker.Item key={number} label={number + ''} value={number} />;
    });

    let quantity = (
      <View style={styles.quantity}>
        <Picker label="Quantity" selectedValue={data.quantity} onValueChange={this.onChange.bind(this)}>
          {quantityItems}
        </Picker>
      </View>
    );

    let trash = (
      <View style={styles.trash}>
        <Icon style={styles.trashIcon} name='trash' size={24} onPress={this.removeCartItem.bind(this)} />
      </View>
    );

    return (
      <View key={data.ref}>
        <View>
          <Text style={styles.product}>{cartItem.product.name}</Text>
          <View style={styles.row}>
            <Text style={styles.producer}>{cartItem.producer.name}</Text>
            <Text> - </Text>
            <Text style={styles.node}>{cartItem.node.name}</Text>
          </View>
        </View>
        <View style={[styles.row, styles.quantityRow]}>
          {quantity}
          {trash}
        </View>
      </View>
    );
  }
}

const styles = {
  product: {
    fontFamily: 'montserrat-semibold',
  },
  producer: {
    fontFamily: 'montserrat-regular',
  },
  node: {
    fontFamily: 'montserrat-regular',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityRow: {
    marginTop: 15,
  },
  trash: {
    flex: 1,
    marginLeft: 15,
    marginBottom: 30,
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
  trashIcon: {
    color: '#333',
    alignSelf: 'center',
  },
  quantity: {
    flex: 10,
  }
}