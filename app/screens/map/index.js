import React from 'react';
import { Text, View, StatusBar } from 'react-native';

export default class MapScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Map'
  };

  render() {
    return (
      <View>
        <StatusBar backgroundColor="blue" barStyle="light-content">
          <Text>Statusbar</Text>
        </StatusBar>
        <Text>Map</Text>
      </View>
    );
  }
}
