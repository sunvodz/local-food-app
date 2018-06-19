import React from 'react';
import { View, Text } from 'react-native';
import ClusteredMapView from 'react-native-maps-super-cluster';
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Loader, Empty, Button } from 'app/components';
import MapCallout from './MapCallout';
import * as actions from './../actions';
import { trans } from 'app/shared';
import mapStyle from '../mapStyle';

export default class MapViewWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.initLocation = {
      latitude: 56.0,
      longitude: 13.3,
      latitudeDelta: 12,
      longitudeDelta: 12,
    };

    if (props.map.location) {
      this.initLocation = {
        latitude: props.map.location.coords.latitude,
        longitude: props.map.location.coords.longitude,
        latitudeDelta: 12,
        longitudeDelta: 12,
      }
    }

    this.state = {
      callout: null,
    }
  }

  refreshNodes() {
    this.props.dispatch(actions.refreshNodes());
  }

  renderCluster = (cluster, onPress) => {
    const pointCount = cluster.pointCount;
    const coordinate = cluster.coordinate;

    return (
      <Marker coordinate={coordinate} onPress={onPress}>
        <View style={styles.clusterIcon}>
          <Text style={styles.clusterText}>{pointCount}</Text>
        </View>
      </Marker>
    )
  }

  op(node) {
    this.setState({callout: node});
  }

  closeCallout() {
    this.setState({callout: null});
  }

  navigateToNode() {
    this.props.navigation.navigate('Node', this.state.callout);
    this.closeCallout();
  };

  renderMarker(node) {
    return (
      <Marker key={node.id} coordinate={node.location} onPress={this.op.bind(this, node)}>
        <Icon name="map-marker" size={32} color="#bf360c" />
      </Marker>
    );
  }

  render() {
    const { map } = this.props;

    if (map.loading) {
      return <Loader />;
    }

    if (!map.nodes && !map.loading) {
      let actionButton = <Button icon='refresh' title={trans('try_again', this.props.lang)} onPress={this.refreshNodes.bind(this)} loading={map.refresh} />
      return <Empty icon="map-marker" header={trans('no_nodes', this.props.lang)} text={trans('no_nodes_text', this.props.lang)} action={actionButton} />;
    }

    let mapData = _.map(_.cloneDeep(map.nodes), (node) => {
      node.location.latitude = parseFloat(node.location.lat);
      node.location.longitude = parseFloat(node.location.lng);

      return node;
    });

    let callout = null;
    if (this.state.callout) {
      callout = <MapCallout
        node={this.state.callout}
        navigateToNode={this.navigateToNode.bind(this)}
        onClose={this.closeCallout.bind(this)}
        lang={this.props.lang}
        />;
    }

    return (
      <View style={{flex: 1}}>
        {callout}
        <ClusteredMapView
          style={{flex: 1}}
          data={mapData}
          initialRegion={this.initLocation}
          ref={(component) => { this.map = component }}
          renderMarker={this.renderMarker.bind(this)}
          renderCluster={this.renderCluster.bind(this)}
          provider={PROVIDER_GOOGLE}
          customMapStyle={mapStyle}
          />
      </View>
    );
  }
}

const styles = {
  clusterIcon: {
    alignItems: 'center',
    backgroundColor: '#bf360c',
    borderRadius: 50,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  clusterText: {
    color: '#fff',
    fontFamily: 'montserrat-semibold',
    fontSize: 12,
  }
};