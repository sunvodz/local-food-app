import React from 'react';
import { View, StyleSheet } from 'react-native';

export default class Card extends React.Component {
  render() {
    return (
      <View style={styles.card}>
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 20,
    elevation: 2,
    borderRadius: 4
  }
});
