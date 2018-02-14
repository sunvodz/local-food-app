import React from 'react';
import { connect } from 'react-redux';
import { Text, View, Button, Modal } from 'react-native';
import MapView from 'react-native-map-clustering';
import { Marker } from 'react-native-maps';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';

import { ContentWrapper, Loader } from 'app/components';
import MapCallout from './MapCallout';
import * as actions from './../actions';

import mapStyle from '../mapStyle';

export default class MapViewWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showMapCallout: false
    };

    this.mapProps = {
      customMapStyle: mapStyle,
      moveOnMarkerPress: false,
      initialRegion: {
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
        latitude: 56.0, // Default position
        longitude: 13.3,
      },
      onRegionChangeComplete: this.onRegionChangeComplete.bind(this),
      style: {
        flex: 1
      },
      clusterColor: '#982b0a',
      clusterTextColor: '#fff',
      clusterBorderWidth: 0,
    };
  }

  onRegionChangeComplete(region) {
    this.updateRegion(region);
  }

  updateRegion(region) {
    this.mapProps.region = Object.assign({}, this.mapProps.region, region);
  }

  componentDidUpdate(prevProps, prevState) {
    const prevLocation = _.get(prevProps, 'map.location');

    if (this.props.map.location !== prevLocation) {
      this.updateRegion({
        latitude: this.props.map.location.coords.latitude,
        latitudeDelta: 0.5,
        longitude: this.props.map.location.coords.longitude,
        longitudeDelta: 0.5,
      });
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
    const { loading, map } = this.props;

    if (loading || !map.nodes) {
      return <Loader />;
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
          <Marker {...markerProps}>
            <Icon name="map-marker" size={50} color="#c0370c" />
          </Marker>
        );
      }.bind(this));
    }

    let mapCallout = null;
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
        <MapView {...this.mapProps}>
          {markers}
        </MapView>
      </View>
    );
  }
}

MapViewWrapper.defaultProps = {
  openNodeModal: function(){}
};
