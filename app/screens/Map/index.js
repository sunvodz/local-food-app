import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { ScreenHeader } from 'app/components';
import MapViewWrapper from './components/MapViewWrapper';
import NodesScreen from 'app/screens/User/screens/Nodes';
import { trans } from 'app/shared';

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
        left = <Icon style={styles.leftIcon} name='list' size={24} color='#fff' onPress={this.toggleMap.bind(this)}/>;
        return (
          <View style={{flex: 1}}>
            <ScreenHeader title={trans('find_nodes', this.props.lang)} right left={left} navigation={this.props.navigation} />
            <MapViewWrapper {...this.props} lang={this.props.lang} />
          </View>
        );
      } else { // Show user nodes
        left = <Icon style={styles.leftIcon} name='globe' size={24} color='#fff' onPress={this.toggleMap.bind(this)}/>;
        return (
          <View style={{flex: 1}}>
            <ScreenHeader title={trans('your_nodes', this.props.lang)} right left={left} navigation={this.props.navigation} />
            <NodesScreen toggleMap={this.toggleMap.bind(this)} lang={this.props.lang} navigation={this.props.navigation}/>
          </View>
        );
      }
    } else { // Show map when user is not logged in
      return (
        <View style={{flex: 1}}>
          <ScreenHeader title={trans('find_nodes', this.props.lang)} navigation={this.props.navigation} />
          <MapViewWrapper {...this.props} lang={this.props.lang} />
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

let styles = {
  calloutHeader: {
    fontWeight: 'bold',
  },
  leftIcon: {
    paddingVertical: 20,
    paddingRight: 20,
  }
};

export default connect(mapStateToProps)(Map);
