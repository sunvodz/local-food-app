import React from 'react';
import Modal from 'react-native-modal';

import { NodeCard } from 'app/components';

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
      backdropOpacity: 0.3,
    };

    return (
      <Modal {...modalProps}>
        <NodeCard node={node} navigateToNode={this.navigateToNode.bind(this)} lang={this.props.lang} />
      </Modal>
    );
  }
}
