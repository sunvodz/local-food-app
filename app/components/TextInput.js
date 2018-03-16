import React from 'react';
import { View, Text, TextInput } from 'react-native';

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
    let hint = this.props.hint || '';

    return (
      <View style={mergedStyles.wrapper}>
        <Text style={mergedStyles.label}>{label}</Text>
        <TextInput {...this.props} style={mergedStyles.textInput} underlineColorAndroid='transparent' placeholderTextColor={mergedStyles.placeholderColor} />
        <Text style={mergedStyles.hint} >{hint}</Text>
      </View>
    );
  }
}

const styles = {
  wrapper: {
    flex: 1,
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    fontFamily: 'montserrat-semibold',
    color: '#949490',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#c4c4c0',
    borderRadius: 2,
    elevation: 1,
    padding: 7,
    textDecorationLine: 'none',
  },
  placeholderColor: '#999',
  hint: {
    color: '#fff',
    fontFamily: 'montserrat-regular',
    fontSize: 12,
  }
};
