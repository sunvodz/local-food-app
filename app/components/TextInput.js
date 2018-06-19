import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styleMerger from 'app/shared/utils/styleMerger';

export default class TextInputComponent extends React.Component {
  render() {
    let mergedStyles = styleMerger.merge(styles, this.props.style);

    let label = null;
    let hint = this.props.hint || '';

    if (this.props.label) {
      label = <Text style={mergedStyles.label}>{this.props.label}</Text>;
    }

    return (
      <View style={mergedStyles.wrapper}>
        {label}
        <TextInput {...this.props} style={mergedStyles.textInput} underlineColorAndroid='transparent' placeholderTextColor={mergedStyles.placeholderColor} />
        <Text style={mergedStyles.hint}>{hint}</Text>
      </View>
    );
  }
}

let styles = {
  wrapper: {
    flex: 1,
  },
  label: {
    marginBottom: 5,
    fontFamily: 'montserrat-semibold',
    color: '#fff',
  },
  textInput: {
    backgroundColor: '#fff',
    borderRadius: 2,
    elevation: 0,
    fontFamily: 'montserrat-regular',
    padding: 7,
    textDecorationLine: 'none',
  },
  placeholderColor: '#666',
  hint: {
    color: '#fff',
    fontFamily: 'montserrat-regular',
    fontSize: 12,
    marginTop: 3,
  }
};
