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
    elevation: 0,
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
