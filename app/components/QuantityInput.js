import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';

import TextInput from './TextInput';
import Button from './Button';

export default class QuantityInput extends React.Component {
  updateQuantity(quantity) {
    this.props.onChange(quantity);
  }

  onDecrease() {
    this.updateQuantity(parseInt(this.props.value) - 1);
  }

  onIncrease() {
    this.updateQuantity(parseInt(this.props.value) + 1);
  }

  render() {
    let increaseProps = {
      name: 'plus-circle',
      style: styles.icon,
      size: 24,
      onPress: this.onIncrease.bind(this),
    };

    let decreaseProps = {
      name: 'minus-circle',
      style: styles.icon,
      size: 24,
      onPress: this.onDecrease.bind(this),
    };

    return (
      <View style={styles.view}>
        <View style={styles.firstColumn}>
          <Icon {...decreaseProps} />
        </View>
        <View style={styles.secondColumn}>
          <Icon {...increaseProps} />
        </View>
        <View style={styles.thirdColumn}>
          <Button style={buttonStyle} title={this.props.title} subTitle={this.props.subTitle} icon={this.props.icon} />
        </View>
      </View>
    );
  }
}

const styles = {
  view: {
    flex: 1,
    flexDirection: 'row',
  },
  firstColumn: {
    flex: 1,
    backgroundColor: '#dadada',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondColumn: {
    alignItems: 'center',
    backgroundColor: '#cacaca',
    justifyContent: 'center',
    flex: 1,
  },
  thirdColumn: {
    backgroundColor: 'blue',
  },
  icon: {
    color: '#fff',
    fontSize: 24,
  },
  disabledIcon: {
    color: '#ccc',
  },
};

const buttonStyle = {
  button: {
    alignSelf: 'center',
    backgroundColor: '#ab300b',
    borderWidth: 0,
    borderRadius: 0,
    elevation: 0,
  }
}
