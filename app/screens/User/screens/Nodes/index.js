import React from 'react';
import { connect } from 'react-redux';
import { Text, View, Button, ListView } from 'react-native';
import _ from 'lodash';

import AuthScreen from 'app/screens/Auth';
import { ContentWrapper, Loader, List, ListItem } from 'app/components';

import * as actions from './actions';

const DataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class Nodes extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(nextProps.nodes, this.props.nodes) || !_.isEqual(nextProps.auth, this.props.auth);
  }

  componentDidUpdate(prevProps, prevState) {
    this.fetchUserNodes();
  }

  componentDidUpdate(prevProps, prevState) {
    this.fetchUserNodes();
  }

  fetchUserNodes() {
    const { auth, nodes } = this.props;

    if (auth && auth.user) {
      if (!nodes.nodes && !nodes.loading) {
        this.props.dispatch(actions.fetchUserNodes());
      }
    }
  }

  navigateToNode(node) {
    this.props.navigation.navigate('Node', node);
  }

  renderListItems(node, sectionId, rowId) {
    let numberOfRows = this.props.nodes.nodes.length - 1;
    let isLastItem = numberOfRows == rowId;

    return (
      <ListItem key={node.id} onPress={this.navigateToNode.bind(this, node)} last={isLastItem}>
        <Text>{node.name}</Text>
      </ListItem>
    );
  }

  onRefresh() {

  }

  render() {
    const { loading, refreshing, nodes } = this.props.nodes;

    if (!this.props.auth.user) {
      return <AuthScreen {...this.props} />;
   }

    if (loading || _.isEmpty(nodes)) {
      return <Loader />;
    }

    let listProps = {
      dataSource: DataSource.cloneWithRows(nodes),
      renderRow: this.renderListItems.bind(this),
      refreshing: refreshing,
      onRefresh: this.onRefresh.bind(this),
    }

    return <List {...listProps} />;

    // let nodes = null;

    // if (this.props.nodes.nodes) {
    //   nodes = _.map(this.props.nodes.nodes, (node) => {
    //     return <Text key={node.id} onPress={this.navigateToNode.bind(this, node)}>{node.name}</Text>;
    //   });
    // }

    // content = (
    //   <View>
    //     {nodes}
    //   </View>
    // );

    // return (
    //   <View style={{flex: 1}}>
    //     <ContentWrapper>
    //       {content}
    //     </ContentWrapper>
    //   </View>
    // );
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
