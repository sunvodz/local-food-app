import React from 'react';
import { connect } from 'react-redux';
import { Text, View, Button, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';

import SmallHeader from 'app/navigations/headers/SmallHeader';
import MapViewWrapper from './components/MapViewWrapper';
import NodesScreen from 'app/screens/User/screens/Nodes';
import * as actions from './actions';

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showMap: false,
    };
  }

  toggleMap() {
    this.setState({showMap: !this.state.showMap});
  }

  render() {
    let left;

    if (this.props.auth && this.props.auth.user) {
      if (this.state.showMap) { // Show map
        left = <Icon name='home' size={24} color='#fff' onPress={this.toggleMap.bind(this)}/>;
        return (
          <View style={{flex: 1}}>
            <SmallHeader title='Find nodes' right left={left} navigation={this.props.navigation} />
            <MapViewWrapper {...this.props} />
          </View>
        );
      } else { // Show user nodes
        left = <Icon name='globe' size={24} color='#fff' onPress={this.toggleMap.bind(this)}/>;
        return (
          <View style={{flex: 1}}>
            <SmallHeader title='Your nodes' right left={left} navigation={this.props.navigation} />
            <NodesScreen navigation={this.props.navigation}/>
          </View>
        );
      }
    } else { // Show map when user is not logged in
      return (
        <View style={{flex: 1}}>
          <SmallHeader title='Find nodes' navigation={this.props.navigation} />
          <MapViewWrapper {...this.props} />
        </View>
      );
    }
  }
}

function mapStateToProps(state) {
  const { map, auth } = state;

  return {
    map,
    auth
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
