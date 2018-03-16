import React from 'react';
import { connect } from 'react-redux';
import { Text, View, Button, Modal } from 'react-native';
import _ from 'lodash';

import MapViewWrapper from './components/MapViewWrapper';
import * as actions from './actions';

class Map extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(nextProps.map, this.props.map);
  }

  componentDidMount() {
    this.props.dispatch(actions.fetchNodes());
    this.props.dispatch(actions.fetchCurrentLocation());
  }

  // componentDidUpdate(prevProps, prevState) {
  //   this.props.dispatch(actions.fetchCurrentLocation());
  // }

  render() {
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

const styles = {
  calloutHeader: {
    fontWeight: 'bold',
  },
};

export default connect(mapStateToProps)(Map);
