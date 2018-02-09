import React from 'react';
import { Button, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import TextInput from './TextInput';

export default class QuantityInput extends React.Component {
  onDecrease() {
    this.props.onChange(this.props.value - 1);
  }

  onIncrease() {
    this.props.onChange(this.props.value + 1);
  }

  render() {
    let increaseProps = {
      name: 'plus-circle',
      style: [styles.icon, this.props.loading && styles.disabledIcon],
      size: 24,
      onPress: this.onIncrease.bind(this),
    };

    let decreaseProps = {
      name: 'minus-circle',
      style: [styles.icon, this.props.loading && styles.disabledIcon],
      size: 24,
      onPress: this.onDecrease.bind(this),
    };

    return (
      <View style={styles.view}>
        <Icon {...decreaseProps} />
        <Text style={styles.text}>{this.props.value}</Text>
        <Icon {...increaseProps} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontFamily: 'montserrat-bold',
    marginHorizontal: 15
  },
  icon: {
    fontSize: 30,
  },
  disabledIcon: {
    color: '#ccc',
  }
});
