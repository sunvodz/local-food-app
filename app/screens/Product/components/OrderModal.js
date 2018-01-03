import React from 'react';
import { Text, View, Modal } from 'react-native';

import { TextInput, ContentWrapper, Card, Button } from 'app/components';

class OrderModal extends React.Component {
  render() {
    let modalProps = {
      presentationStyle: 'formSheet',
      onRequestClose: this.props.onRequestClose,
    };

    modalProps.visible = this.props.visible;

    return (
      <Modal {...modalProps}>
        <Text>ORDER MODAL</Text>
      </Modal>
    );
  }
}

export default OrderModal;
