import React from 'react';
import { Text, View, StatusBar } from 'react-native';

import Header from '../../components/Header';
import ContentWrapper from '../../components/ContentWrapper';

export default class MapScreen extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Header label='Find nodes'/>
        <ContentWrapper>
          <Text>Map</Text>
        </ContentWrapper>
      </View>
    );
  }
}
