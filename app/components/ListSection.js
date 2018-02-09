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
    fontFamily: 'montserrat-bold',
    color: '#b4b4b0',
    marginTop: 15,
    marginBottom: 2,
    marginLeft: 5,
    marginRight: 5,
  },
  rowWrapper: {
    marginHorizontal: 5
  }
};
