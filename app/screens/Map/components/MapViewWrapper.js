import React from 'react';
import { connect } from 'react-redux';
import { Text, View, Modal } from 'react-native';
import MapView from 'react-native-map-clustering';
import { Marker } from 'react-native-maps';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Loader, Empty, Button } from 'app/components';
import MapCallout from './MapCallout';
import * as actions from './../actions';
import mapStyle from '../mapStyle';
import { trans } from 'app/shared';

export default class MapViewWrapper extends React.Component {
  constructor(props) {
    super(props);

    let location = { lat: 56.0, lng: 13.3 }; // Fallback
    if (props.map.location) {
      location = {
        lat: props.map.location.coords.latitude,
        lng: props.map.location.coords.longitude,
      }
    }

    this.mapProps = {
      customMapStyle: mapStyle,
      moveOnMarkerPress: false,
      initialRegion: {
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
        latitude: location.lat,
        longitude: location.lng,
      },
      style: {
        flex: 1
      },
      clusterColor: '#982b0a',
      clusterTextColor: '#fff',
      clusterBorderWidth: 0,
    };

    this.state = {
      showMapCallout: false,
    };
  }

  refreshNodes() {
    this.props.dispatch(actions.refreshNodes());
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
      let actionButton = <Button icon='refresh' title='Försök igen' onPress={this.refreshNodes.bind(this)} loading={map.refresh} />
      return <Empty icon="map-marker" header={trans('no_nodes', this.props.lang)} text={trans('no_nodes_text', this.props.lang)} action={actionButton} />;
    }

    let markers = null;
    if (map.nodes)  {
      markers = _.map(map.nodes, function(node) {
        if (!node.location) {
          return;
        }

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
        lang: this.props.lang,
      };

      mapCallout = <MapCallout {...calloutProps} />;
    }


    return (
      <View style={{flex: 1}}>
        {mapCallout}
        <MapView {...this.mapProps} ref={component => this.mapViewRef = component}>
          {markers}
        </MapView>
      </View>
    );
  }
}
