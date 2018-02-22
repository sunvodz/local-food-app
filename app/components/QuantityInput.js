import React from 'react';
import { Button, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';

import TextInput from './TextInput';

export default class QuantityInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      internalValue: parseInt(props.value),
      savedValue: parseInt(props.value),
      loading: false,
    };

    let debounceTime = this.props.instant ? 0 : 1000;
    this.debouncedUpdateQuantity = _.debounce(this.updateQuantity.bind(this), debounceTime);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.loading !== prevProps.loading) {
      this.setState({
        loading: this.props.loading
      });
    }
  }

  updateQuantity(quantity) {
    this.props.onChange(quantity);
  }

  onDecrease() {
    this.setState({loading: true});
    this.debouncedUpdateQuantity(parseInt(this.props.value) - 1);
  }

  onIncrease() {
    this.setState({loading: true});
    this.debouncedUpdateQuantity(parseInt(this.props.value) + 1);
  }

  render() {
    let loading = false;
    if (!this.props.instant) {
      loading = this.props.loading || this.state.loading;
    }

    let increaseProps = {
      name: 'plus-circle',
      style: [styles.icon, loading && styles.disabledIcon],
      size: 24,
      onPress: this.onIncrease.bind(this),
    };

    let decreaseProps = {
      name: 'minus-circle',
      style: [styles.icon, loading && styles.disabledIcon],
      size: 24,
      onPress: this.onDecrease.bind(this),
    };

    let value = <Text style={styles.text}>{this.props.value}</Text>
    if (loading) {
      value = <ActivityIndicator />;
    }

    return (
      <View style={styles.view}>
        <Icon {...decreaseProps} />
        {value}
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
    fontFamily: 'montserrat-semibold',
    marginHorizontal: 15
  },
  icon: {
    fontSize: 30,
  },
  disabledIcon: {
    color: '#ccc',
  }
});
