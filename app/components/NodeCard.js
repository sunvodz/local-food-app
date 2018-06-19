import React from 'react';
import { connect } from 'react-redux';
import { View, Dimensions, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';

import { Link, Text } from 'app/components';
import { trans } from 'app/shared';

export default class NodeCard extends React.Component {
  navigateToNode() {
    this.props.navigateToNode(this.props.node);
  }

  removeNode() {
    this.props.removeNode(this.props.node.id);
  }

  render() {
    const { node } = this.props;

    let remove = this.props.removeNode ? <Link title={trans('remove', this.props.lang)} onPress={this.removeNode.bind(this)}/> : null;

    return (
      <View style={styles.modal}>
        <View style={styles.modalContent}>
          <Text style={styles.node.title}>{node.name}</Text>
          <Text style={styles.node.address}>{node.address}, {node.zip}, {node.city}</Text>
          <Text style={styles.node.info}>{trans('welcome_node', this.props.lang)} {node.name}</Text>
        </View>
        <View style={styles.modalFooter}>
          <Link title={trans('go_to_node', this.props.lang)} onPress={this.navigateToNode.bind(this)}/>
          {remove}
        </View>
      </View>
    );
  }
}

const styles = {
  modal: {
    elevation: 0,
    margin: 5,
    backgroundColor: '#fff',
  },
  modalContent: {
    padding: 15
  },
  node: {
    title: {
      fontFamily: 'montserrat-medium',
      fontSize: 20,
    },
    address: {
      marginVertical: 5,
    },
    info: {
      marginVertical: 15,
    },
  },
  modalFooter: {
    borderTopColor: '#f0f0f0',
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  }
};
