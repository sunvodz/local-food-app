import React from 'react';
import { connect } from 'react-redux';
import { Text, View, Button, Modal, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import _ from 'lodash';

import { ContentWrapper, Loader } from 'app/components';
import * as actions from './../actions';
import mapStyle from '../mapStyle';

export default class MapViewWrapper extends React.Component {
  navigateToNode(node) {
    this.props.navigation.navigate('Node', node);
  }

  render() {
    const { map } = this.props;

    let content = null;

    let mapViewProps = {
      customMapStyle: mapStyle,
      region: {
        latitude: 56, // Default
        longitude: 13, // Default
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      },
      style: {
        flex: 1
      }
    };

    if (map.location) {
      mapViewProps.region.latitude = map.location.coords.latitude;
      mapViewProps.region.longitude = map.location.coords.longitude;
    }

    let markers = null;
    if (map.nodes)  {
      markers = _.map(map.nodes, function(node) {
        let coordinate = {
          latitude: parseFloat(node.location.lat),
          longitude: parseFloat(node.location.lng)
        };

        return (
          <MapView.Marker key={node.id} coordinate={coordinate}>
            <MapView.Callout onPress={this.navigateToNode.bind(this, node)}>
              <Text>{node.name}</Text>
              <Text>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500.
              </Text>
            </MapView.Callout>
          </MapView.Marker>
        );
      }.bind(this));
    }

    return (
      <View style={{flex: 1}}>
        <MapView {...mapViewProps}>
          {markers}
        </MapView>
      </View>
    );
  }
}

MapViewWrapper.defaultProps = {
  openNodeModal: function(){}
};

const styles = StyleSheet.create({
  callout: {
  },
  calloutHeader: {
    fontWeight: 'bold',
  },
});
