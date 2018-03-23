import React from 'react';
import { View, Text } from 'react-native';

export default class ListSection extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Text style={styles.label}>{this.props.label}</Text>
        <View style={styles.rowWrapper}>
          {this.props.children}
        </View>
      </View>
    );
  }
}

const styles = {
  label: {
    fontFamily: 'montserrat-semibold',
    color: '#333',
    marginTop: 15,
    marginLeft: 15,
    marginBottom: 2,
  },
  rowWrapper: {

  }
};
