import React from 'react';
import { connect } from 'react-redux';
import { View, Dimensions, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import _ from 'lodash';

import { Link, Text, NodeCard } from 'app/components';

export default class MapCallout extends React.Component {
  navigateToNode(node) {
    this.props.navigateToNode(node);
  }

  render() {
    const { node } = this.props;

    let modalProps = {
      isVisible: true,
      onBackButtonPress: this.props.onClose,
      onBackdropPress: this.props.onClose,
      backdropOpacity: 0,
    };

    return (
      <Modal {...modalProps}>
        <NodeCard node={node} navigateToNode={this.navigateToNode.bind(this)} />
      </Modal>
    );
  }
}
