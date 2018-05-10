import React from 'react';
import { connect } from 'react-redux';
import { Text, View, Button, ListView } from 'react-native';
import _ from 'lodash';

import AuthScreen from 'app/screens/Auth';
import { ContentWrapper, Loader, Empty, NodeCard } from 'app/components';

import * as actions from './actions';

const DataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class Nodes extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(nextProps.nodes, this.props.nodes) || !_.isEqual(nextProps.auth, this.props.auth);
  }

  componentDidMount() {
    if (this.props.auth.user) {
      this.props.dispatch(actions.fetchUserNodes())
    }
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.props.auth.user) {
  //     if (prevProps.nodes.nodes !== this.props.nodes.nodes && !nodes.loading) {
  //       this.props.dispatch(actions.fetchUserNodes());
  //     }
  //   }
  // }

  // fetchUserNodes() {
  //   const { auth, nodes } = this.props;

  //   if (auth && auth.user) {
  //     if (!nodes.nodes && !nodes.loading) {
  //       this.props.dispatch(actions.fetchUserNodes());
  //     }
  //   }
  // }

  navigateToNode(node) {
    this.props.navigation.navigate('Node', node);
  }

  removeNode(nodeId) {
    this.props.dispatch(actions.removeNodeFromUser(nodeId));
  }

  render() {
    const { loading, refreshing, nodes } = this.props.nodes;

    if (!this.props.auth.user || this.props.auth.loading) {
      return <AuthScreen {...this.props} fullscreen={true} />;
   }

    if (loading) {
      return <Loader />;
    }

    if (_.isEmpty(nodes)) {
      return <Empty icon="map-marker" header="Nothing here" text="You don't follow any nodes. Visit a node and add it to your list." />;
    }

    let nodeCards = _.map(nodes, node => {
      return (
        <View key={node.id} style={{marginBottom: 15}}>
          <NodeCard node={node} navigateToNode={this.navigateToNode.bind(this)} removeNode={this.removeNode.bind(this)} />
        </View>
        );
    });

    return (
      <ContentWrapper style={{backgroundColor: 'red'}}>
        {nodeCards}
      </ContentWrapper>
    );
  }
}

function mapStateToProps(state) {
  const { auth, nodes } = state;

  return {
    auth,
    nodes,
  }
}

export default connect(mapStateToProps)(Nodes);
