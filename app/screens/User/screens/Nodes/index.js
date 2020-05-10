import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import _ from 'lodash';

import { ContentWrapper, Loader, Empty, NodeCard, Button } from 'app/components';

import * as actions from './actions';
import { trans } from 'app/shared';

class Nodes extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(nextProps.nodes, this.props.nodes) || !_.isEqual(nextProps.auth, this.props.auth);
  }

  componentDidMount() {
    if (this.props.auth.user) {
      this.props.dispatch(actions.fetchUserNodes());
    }
  }

  navigateToNode(node) {
    this.props.navigation.navigate('node', node);
  }

  removeNode(nodeId) {
    this.props.dispatch(actions.removeNodeFromUser(nodeId));
  }

  render() {
    const { loading, nodes } = this.props.nodes;

    if (loading) {
      return <Loader />;
    }

    if (_.isEmpty(nodes)) {
      let actionButton = <Button icon='globe' title={trans('Find nodes', this.props.lang)} onPress={this.props.toggleMap} />
      return <Empty icon="map-marker" action={actionButton} header={trans('Nodes', this.props.lang)} text={trans('You are not following any nodes.', this.props.lang)} />;
    }

    let nodeCards = nodes.map((node, index) => {
      let marginBottom = nodes.length == (index + 1) ? 0 : 15;

      return (
        <View key={node.id} style={{marginBottom: marginBottom}}>
          <NodeCard node={node} navigateToNode={this.navigateToNode.bind(this)} removeNode={this.removeNode.bind(this)} lang={this.props.lang} />
        </View>
      );
    });

    return (
      <ContentWrapper>
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
