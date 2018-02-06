import React from 'react';
import { Button, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import TextInput from './TextInput';

export default class QuantityInput extends React.Component {
  onDecrease() {
    let newValue = this.props.value - 1;
    this.props.onChange(newValue);
  }

  onIncrease() {
    let newValue = this.props.value + 1;
    this.props.onChange(newValue);
  }

  render() {
    let content = <ActivityIndicator color='#ccc' size='small' />;
    let increaseProps = {};
    let decreaseProps = {};

    if (!this.props.loading) {
      increaseProps.onPress = this.onIncrease.bind(this);
      decreaseProps.onPress = this.onDecrease.bind(this);
      content = <Text style={styles.text}>{this.props.value}</Text>;
    }

    return (
      <View style={styles.view}>
        <Icon style={[styles.icon, this.props.loading && styles.disabledIcon]} name='minus-circle' size={24} {...decreaseProps} />
        {content}
        <Icon style={[styles.icon, this.props.loading && styles.disabledIcon]} name='plus-circle' size={24} {...increaseProps} />
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
