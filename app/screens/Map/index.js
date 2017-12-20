import React from 'react';
import { connect } from 'react-redux';
import { Text, View, Button, Modal, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import _ from 'lodash';

import Map from './components/Map';
import { Header, ContentWrapper, Loader } from '../../components';
import * as actions from './actions';

class MapScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch, map } = this.props;

    dispatch(actions.requestNodes());
    dispatch(actions.requestCurrentLocation());
  }

  componentDidUpdate(prevProps, prevState) {
    const { map } = this.props;

    if (map.nodes !== prevProps.map.nodes) {

    }
  }

  render() {
    const { map } = this.props;

    return <Map {...this.props} />;
  }
}

function mapStateToProps(state) {
  const { map } = state;

  return {
    map
  }
}

MapScreen.defaultProps = {
  map: {
    nodes: null,
    location: null
  }
};

const styles = StyleSheet.create({
  calloutHeader: {
    fontWeight: 'bold',
  },
});

export default connect(mapStateToProps)(MapScreen);
