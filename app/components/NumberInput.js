import React from 'react';
import TextInput from './TextInput';

export default class NumberInputComponent extends React.Component {
  render() {
    return (
      <TextInput {...this.props} keyboardType="numeric" />
    );
  }
}
