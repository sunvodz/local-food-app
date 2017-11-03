import React from 'react';
import { connect } from 'react-redux';
import { Text, View, StatusBar } from 'react-native';
import MapView from 'react-native-maps';
import _ from 'lodash';

import { Header, ContentWrapper, Loader } from '../../components';
import * as actions from './actions';

class MapScreen extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(actions.requestCurrentLocation());
    dispatch(actions.requestNodes());
  }

  componentDidUpdate() {
    console.log('map update', this.props.map.location);
  }

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

        return (
          <MapView.Marker key={node.id} coordinate={coordinate} title={node.name} onPress={() => {console.log('PRESS')}} />
        );
      });
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

// MapScreen.defaultProps = {
//   map: {
//
//   }
// };

function mapStateToProps(state) {
  const { map } = state;

  return {
    map
  }
}

export default connect(mapStateToProps)(MapScreen);
