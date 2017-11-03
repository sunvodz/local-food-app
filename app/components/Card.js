import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Card extends React.Component {
  render() {
    let header = null;
    if (this.props.header) {
      header = <Text style={styles.header}>{this.props.header}</Text>;
    }

    return (
      <View style={styles.card}>
        {header}
        <View style={styles.content}>
          {this.props.children}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 20,
  },
  content: {
    padding: 10,
  },
  header: {
    color: '#ccc',

    paddingHorizontal: 10,
    paddingTop: 10,
  }
});
