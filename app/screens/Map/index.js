import React from 'react';
import { connect } from 'react-redux';
import { Text, View, Button, Modal, StyleSheet } from 'react-native';
// import MapView from 'react-native-maps';
import _ from 'lodash';

import MapViewWrapper from './components/MapViewWrapper';
import { Header, ContentWrapper, Loader } from '../../components';
import * as actions from './actions';

class Map extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(nextProps.map, this.props.map);
  }

  componentDidMount() {
    const { dispatch, map } = this.props;

    dispatch(actions.fetchNodes());
    dispatch(actions.fetchCurrentLocation());
  }

  componentDidUpdate(prevProps, prevState) {
    const { map } = this.props;

    if (map.nodes !== prevProps.map.nodes) {

    }
  }

  render() {
    const { map } = this.props;

    return <MapViewWrapper {...this.props} />;
  }
}

function mapStateToProps(state) {
  const { map } = state;

  return {
    map
  }
}

Map.defaultProps = {
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

export default connect(mapStateToProps)(Map);
