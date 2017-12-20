import React from 'react';
import { connect } from 'react-redux';
import { Text, View, Button, Modal, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import _ from 'lodash';

import { ContentWrapper, Loader } from '../../../components';
import * as actions from './../actions';

export default class Map extends React.Component {
  render() {
    const { map } = this.props;

    let content = null;

    let mapViewProps = {
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

        let navigateToNode = function(node) {
          this.props.navigation.navigate('NodeScreen');
        }

        return (
          <MapView.Marker key={node.id} coordinate={coordinate}>
            <MapView.Callout onPress={() => this.props.openNodeModal(node)} style={styles.callout}>
              <Text style={styles.calloutHeader}>{node.name}</Text>
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

Map.defaultProps = {
  openNodeModal: function(){}
};

const styles = StyleSheet.create({
  callout: {

  },
  calloutHeader: {
    fontWeight: 'bold',
  },
});
