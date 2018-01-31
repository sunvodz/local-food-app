import React from 'react';
import { Text, View } from 'react-native';
import Modal from 'react-native-modal';
import _ from 'lodash';
import moment from 'moment';

import { NumberInput, Button, Badge, BadgeWrapper, Card, Picker } from 'app/components';

class OrderForm extends React.Component {
  constructor(props) {
    super(props);

    const { product } = props;

    this.state = {
      quantity: '1',
      dates: [],
      variant_id: null
    };

    if (product.product_variants_relationship.length > 0) {
      this.state.variant_id = product.product_variants_relationship[0].id;
    }
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
    if (this.props.addToCart) {
      let data = this.state;
      data.product_id = this.props.product.id;
      this.props.addToCart(data);
    }
  }

  onSelectVariant(value, index) {
    this.setState({variant: value});
  }

  render() {
    const { product } = this.props;

    if (!this.props.dates || this.props.dates.length === 0) {
      return (
        <Card header="Place your order">
          <Text>Produkten är inte tillgänglig</Text>
        </Card>
      );
    }

    let dates = _.map(this.props.dates, (quantity, date) => {
      let selected = _.includes(this.state.dates, date);
      let label = `${date}`;

      return <Badge key={date} label={label} selected={selected} onPress={this.toggleDate.bind(this, date)} />;
    });

    let variants = null;
    if (product.product_variants_relationship.length > 0) {
      let pickerItems = product.product_variants_relationship.map(variant => {
        return <Picker.Item key={variant.id} label={variant.name} value={variant.id} />;
      });

      variants = (
        <Picker label="Variant" selectedValue={this.state.variant_id} onValueChange={this.onSelectVariant.bind(this)}>
          {pickerItems}
        </Picker>
      );
    }

    return (
      <Card header="Place your order" style={{marginBottom: 15}}>
        <BadgeWrapper label="Delivery dates">{dates}</BadgeWrapper>
        {variants}
        <NumberInput label="Quantity" onChangeText={this.setQuantity.bind(this)} value={this.state.quantity} />
        <Button onPress={this.addToCart.bind(this)} title="Add to cart" color="#bc3b1f" />
      </Card>
    );
  }
}

export default OrderForm;
