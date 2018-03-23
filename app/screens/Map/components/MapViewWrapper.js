import React from 'react';
import { connect } from 'react-redux';
import { Text, View, Button, Modal } from 'react-native';
import MapView from 'react-native-map-clustering';
import { Marker } from 'react-native-maps';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Loader, Empty } from 'app/components';
import MapCallout from './MapCallout';
import * as actions from './../actions';

import mapStyle from '../mapStyle';

export default class MapViewWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.mapProps = {
      ref: ref => {
        mapView = ref
      },
      customMapStyle: mapStyle,
      moveOnMarkerPress: false,
      initialRegion: {
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
        latitude: 56.0, // Default position
        longitude: 13.3,
      },
      maxZoomLevel: 15,
      onRegionChangeComplete: this.onRegionChangeComplete.bind(this),
      style: {
        flex: 1
      },
      onClusterPress: coordinate => {
        this.animate(coordinate);
      },
      clusterColor: '#982b0a',
      clusterTextColor: '#fff',
      clusterBorderWidth: 0,
    };

    this.state = {
      showMapCallout: false,
    };
  }

  animate(coordinate){
    let region = {
         latitude: coordinate.latitude,
         longitude: coordinate.longitude,
         latitudeDelta: mapView.state.region.latitudeDelta - (mapView.state.region.latitudeDelta / 2),
         longitudeDelta: mapView.state.region.longitudeDelta - (mapView.state.region.longitudeDelta / 2),
     };

     mapView._root.animateToRegion(region, 200)
  }

  onRegionChangeComplete(region) {
    this.updateRegion(region);
  }

  updateRegion(region) {
    this.mapProps.region = region;
    this.forceUpdate();
  }

  componentDidUpdate(prevProps, prevState) {
    const prevLocation = _.get(prevProps, 'map.location');

    if (this.props.map.location && this.props.map.location !== prevLocation) {
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
    const { map } = this.props;

    if (map.loading) {
      return <Loader />;
    }

    if (!map.nodes && !map.loading) {
      return <Empty icon="map-marker" header="Couldn't find any nodes" text="This is probably because we're having trouble connecting to the server" />;
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
