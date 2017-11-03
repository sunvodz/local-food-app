import React, { Component } from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';

export default class OrderModal extends Component {
  render() {
    return (
      <Modal visible={this.props.visible} onRequestClose={this.props.closeHandler}>
       <View style={styles.modal}>
        <Text>{this.props.orderData.ref}</Text>
        <Button onPress={this.props.closeHandler} title="Close" accessibilityLabel="Close"/>
       </View>
      </Modal>
    );
  }
}

OrderModal.defaultProps = {
  visible: false,
  orderData: null,
  closeHandler: function() {}
};

const styles = StyleSheet.create({
  modal: {
    margin: 60
  }
});
