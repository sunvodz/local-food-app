import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import _ from 'lodash';
import { ContentWrapper, Loader, Empty, NodeCard, Button } from 'app/components';
import * as actions from './actions';
import { trans } from 'app/shared';

class Nodes extends React.Component {
  componentDidMount() {
    this.props.dispatch(actions.fetchUserNodes(this.props.system.lang));
  }

  navigateToNode(node) {
    this.props.navigation.navigate('Node', {
      node: node
    });
  }

  navigateToMap() {
    this.props.navigation.navigate('Map');
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
      let actionButton = <Button icon='globe' title={trans('Find nodes', this.props.system.lang)} onPress={this.navigateToMap.bind(this)} />
      return <Empty icon="map-marker" action={actionButton} header={trans('Nodes', this.props.system.lang)} text={trans('You are not following any nodes.', this.props.system.lang)} />;
    }

    let nodeCards = nodes.map((node, index) => {
      let marginBottom = nodes.length == (index + 1) ? 0 : 15;

      return (
        <View key={node.id} style={{marginBottom: marginBottom}}>
          <NodeCard node={node} navigateToNode={this.navigateToNode.bind(this)} removeNode={this.removeNode.bind(this)} lang={this.props.system.lang} />
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
  const { nodes, system } = state;

  return {
    nodes,
    system,
  }
}

export default connect(mapStateToProps)(Nodes);
