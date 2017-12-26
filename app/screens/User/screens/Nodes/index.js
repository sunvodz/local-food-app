import React from 'react';
import { connect } from 'react-redux';
import { Text, View, Button } from 'react-native';
import _ from 'lodash';

import AuthScreen from 'app/screens/Auth';
import { ContentWrapper, Loader, Header } from 'app/components';

import * as actions from './actions';

class Nodes extends React.Component {
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

  render() {
    let content = null;

    if (this.props.auth.loading) {
      return <Loader />;
    }

    if (!this.props.auth.user) {
       content = <AuthScreen {...this.props} />;
    }

    if (this.props.auth.user) {
      let nodes = null;

      if (this.props.nodes.nodes) {
        nodes = _.map(this.props.nodes.nodes, (node) => {
          return <Text key={node.id}>{node.name}</Text>;
        });
      }

      content = (
        <View>
          {nodes}
        </View>
      );
    }

    return (
      <View style={{flex: 1}}>
        <Header label="Your nodes"></Header>
        <ContentWrapper>
          {content}
        </ContentWrapper>
      </View>
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
