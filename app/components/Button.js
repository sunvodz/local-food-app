import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';

export default class ButtonComponent extends React.Component {
  render() {
    let text = <Text style={styles.title}>{this.props.title.toUpperCase()}</Text>;
    let onPress = this.props.onPress;

    if (this.props.loading) {
      text = <ActivityIndicator color='#fff' size='small' />;
      onPress = null;
    }

    return (
      <TouchableOpacity onPress={onPress} style={styles.button} activeOpacity={0.9}>
        {text}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: '#bc3b1f',
    padding: 15,
    borderRadius: 3,
    elevation: 0,
  },
  title: {
    color: '#fff',
    alignSelf: 'center',
    fontFamily: 'montserrat-medium'
  }
});
