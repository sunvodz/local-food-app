import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styleMerger from 'app/shared/utils/styleMerger';

export default class TextInputComponent extends React.Component {
  render() {
    let mergedStyles = styleMerger.merge(styles, this.props.style);

    let label = null;
    let hint = null;
    if (this.props.hint) {
      hint = <Text style={mergedStyles.hint}>{this.props.hint}</Text>
    }

    if (this.props.label) {
      label = <Text style={mergedStyles.label}>{this.props.label}</Text>;
    }

    return (
      <View style={mergedStyles.wrapper}>
        {label}
        <TextInput {...this.props} style={mergedStyles.textInput} underlineColorAndroid='transparent' placeholderTextColor={mergedStyles.placeholderColor} />
        {hint}
      </View>
    );
  }
}

let styles = {
  wrapper: {
    flex: 1,
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    fontFamily: 'montserrat-semibold',
    color: '#fff',
  },
  textInput: {
    backgroundColor: '#fff',
    elevation: 0,
    fontFamily: 'montserrat-regular',
    paddingHorizontal: 15,
    paddingVertical: 15,
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
