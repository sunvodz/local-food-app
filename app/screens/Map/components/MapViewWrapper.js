import React from 'react';
import { connect } from 'react-redux';
import { Text, View, Button, Modal, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import _ from 'lodash';

import { ContentWrapper, Loader } from 'app/components';
import MapCallout from './MapCallout';
import * as actions from './../actions';
import mapStyle from '../mapStyle';

export default class MapViewWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showMapCallout: false,
      mapCenter: {
        latitude: 56,
        longitude: 13,
      } 
    }
  }

  navigateToNode(node) {
    this.closeMapCallout();
    this.props.navigation.navigate('Node', node);
  }

  openMapCallout(node, coordinate) {
    this.setState({
      showMapCallout: true,
      selectedNode: node,
      mapCenter: coordinate
    });
  }

  closeMapCallout() {
    this.setState({
      showMapCallout: false,
      selectedNode: null,
    });
  }

  render() {
    const { map } = this.props;

    let content = null;

    let mapViewProps = {
      customMapStyle: mapStyle,
      moveOnMarkerPress: false,
      region: {
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      },
      style: {
        flex: 1
      }
    };

    if (this.state.mapCenter) {
      mapViewProps.region.latitude = this.state.mapCenter.latitude;
      mapViewProps.region.longitude = this.state.mapCenter.longitude;
    } else if (map.location) {
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

        let markerProps = {
          key: node.id,
          coordinate: coordinate,
          onPress: this.openMapCallout.bind(this, node, coordinate),
          tracksViewChanges: false
        };

        return (
          <MapView.Marker {...markerProps} />
        );
      }.bind(this));
    }

    mapCallout = null;
    if (this.state.showMapCallout) {
      let calloutProps = {
        node: this.state.selectedNode,
        onClose: this.closeMapCallout.bind(this),
        navigateToNode: this.navigateToNode.bind(this),
      };

      mapCallout = <MapCallout {...calloutProps} />;
    }

    return (
      <View style={{flex: 1}}>
        {mapCallout}
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
