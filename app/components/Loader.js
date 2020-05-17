import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import globalStyle from 'app/styles';

export default class Loader extends React.Component {
  render() {
    return (
      <View style={styles.view}>
        <ActivityIndicator color='#333' />
      </View>
    );
  }
}

let styles = {
  view: {
    backgroundColor: globalStyle.backgroundColor,
    flex: 1,
    justifyContent: 'center',
  }
};
