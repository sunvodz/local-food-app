import React from 'react';
import { connect } from 'react-redux';
import MapViewWrapper from './components/MapViewWrapper';
import * as mapActions from 'app/screens/Map/actions';
import { Loader } from 'app/components';

class Map extends React.Component {
  componentDidMount() {
    this.props.dispatch(mapActions.fetchCurrentLocation());
    this.props.dispatch(mapActions.fetchNodes());
  }

  render() {
    if (this.props.map.loading) {
      return <Loader />;
    }

    return (
      <MapViewWrapper {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  const { map, system } = state;

  return {
    map,
    system,
  }
}

Map.defaultProps = {
  map: {
    nodes: null,
    location: null
  }
};

let styles = {
  headerLeftIcon: {
    marginLeft: 15,
  }
};

export default connect(mapStateToProps)(Map);
