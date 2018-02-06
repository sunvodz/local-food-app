import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default class TextInputComponent extends React.Component {
  render() {
    let label = this.props.label || '';

    return (
      <View>
        <Text style={styles.label}>{label.toUpperCase()}</Text>
        <TextInput {...this.props} style={styles.textInput} underlineColorAndroid='transparent' />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 5,
  },
  textInput: {
    paddingVertical: 10,
    textDecorationLine: 'none',
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#9e9e9e',
    borderRadius: 2,
  }
});
