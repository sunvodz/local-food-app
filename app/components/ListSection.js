import React from 'react';
import { View, Text } from 'react-native';

export default class ListSection extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Text style={styles.label}>{this.props.label}</Text>
        <View>
          {this.props.children}
        </View>
      </View>
    );
  }
}

let styles = {
  label: {
    color: '#000',
    fontFamily: 'montserrat-semibold',
    marginTop: 15,
    marginBottom: 5,
  },
};
