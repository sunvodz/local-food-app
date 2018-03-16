import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Loader extends React.Component {
  render() {
    return (
      <View style={styles.view}>
        <ActivityIndicator color='#ccc' size='large' />
      </View>
    );
  }
}

const styles = {
  view: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  }
};
