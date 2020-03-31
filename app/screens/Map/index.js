import React from 'react';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-native';
import { FontAwesome as Icon } from '@expo/vector-icons';

import MapViewWrapper from './components/MapViewWrapper';
import NodesScreen from 'app/screens/User/screens/Nodes';
import { trans } from 'app/shared';
import globalStyle from 'app/styles';
import * as mapActions from 'app/screens/Map/actions';
import { Loader } from 'app/components';

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showMap: false,
    };

    if (props.auth && props.auth.user) {
      this.props.navigation.setParams({ title: trans('Your nodes', this.props.lang), leftOnPress: this.toggleMap, icon: 'globe'})
    } else {
      this.props.navigation.setParams({ title: trans('Find nodes', this.props.lang), leftOnPress: this.toggleMap, icon: 'list'})
    }
  }

  componentDidMount() {
    this.props.dispatch(mapActions.fetchCurrentLocation());
    this.props.dispatch(mapActions.fetchNodes());
  }

  toggleMap = () => {
    if (!this.state.showMap) {
      this.props.navigation.setParams({ title: trans('Find nodes', this.props.lang), icon: 'list'})
    } else {
      this.props.navigation.setParams({ title: trans('Your nodes', this.props.lang), icon: 'globe'})
    }
    this.setState({showMap: !this.state.showMap});
  }

  render() {
    let left;

    if (!this.props.auth || this.props.auth.loading || this.props.map.loading) {
      return <Loader />;
    }

    if (this.props.auth && this.props.auth.user) {
      if (this.state.showMap) { // Show map
        left = <Icon style={styles.leftIcon} name='list' size={24} color='#fff' onPress={this.toggleMap.bind(this)}/>;
        return (
          <SafeAreaView style={{flex: 1, backgroundColor: globalStyle.primaryColor}}>
            <MapViewWrapper {...this.props} lang={this.props.lang} />
          </SafeAreaView>
        );
      } else { // Show user nodes
        left = <Icon style={styles.leftIcon} name='globe' size={24} color='#fff' onPress={this.toggleMap.bind(this)}/>;
        return (
          <SafeAreaView style={{flex: 1, backgroundColor: globalStyle.primaryColor}}>
            <NodesScreen toggleMap={this.toggleMap.bind(this)} lang={this.props.lang} navigation={this.props.navigation}/>
          </SafeAreaView>
        );
      }
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
};

export default connect(mapStateToProps)(Map);
