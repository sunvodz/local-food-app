import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default class TextInputComponent extends React.Component {
  render() {
    return (
      <View>
        <TextInput {...this.props} style={styles.textInput} underlineColorAndroid='#ccc' selectionColor='#333' />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  label: {

  },
  textInput: {
    paddingVertical: 10,
    textDecorationLine: 'none',
    marginBottom: 20
  }
});
