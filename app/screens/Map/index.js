import React from 'react';
import { connect } from 'react-redux';
import { Text, View, Button, Modal, StyleSheet } from 'react-native';
import _ from 'lodash';

import MapViewWrapper from './components/MapViewWrapper';
import { Header, ContentWrapper, Loader, ServerError } from '../../components';
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

  render() {
    if (this.props.map.serverError) {
      return <ServerError />;
    }

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
