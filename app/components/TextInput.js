import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default class TextInputComponent extends React.Component {
  mergeStyles() {
    let mergeStyles = {};

    Object.keys(styles).map(key => {
      mergeStyles[key] = styles[key];

      if (this.props.style && this.props.style[key]) {
        mergeStyles[key] = Object.assign({}, styles[key], this.props.style[key]);
      }
    });

    return mergeStyles;
  }

  render() {
    let mergedStyles = this.mergeStyles();
    let label = this.props.label || '';

    return (
      <View style={{flex: 1}}>
        <Text style={mergedStyles.label}>{label.toUpperCase()}</Text>
        <TextInput {...this.props} style={mergedStyles.textInput} underlineColorAndroid='transparent' />
      </View>
    );
  }
}

const styles = {
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
};
