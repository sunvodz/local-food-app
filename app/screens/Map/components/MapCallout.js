import React from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, Dimensions, Image } from 'react-native';
import Modal from 'react-native-modal';
import _ from 'lodash';

import { ContentWrapper, Loader, Link } from 'app/components';

export default class MapCallout extends React.Component {
  navigateToNode() {
    this.props.navigateToNode(this.props.node);
  }

  render() {
    const { node } = this.props;

    let modalProps = {
      isVisible: true,
      onBackButtonPress: this.props.onClose,
      onBackdropPress: this.props.onClose,
      backdropOpacity: 0,
    };

    let image = null; // Fallback here
    if (node.image_relationship && node.image_relationship.length > 0) {
      const uri = node.image_relationship[0].urls.medium;
      const dimensions = Dimensions.get('window');
      const imageHeight = Math.round(dimensions.width * 9 / 16);
      const imageWidth = dimensions.width;

      image = <Image source={{uri: uri}} style={{width: imageWidth, height: imageHeight}} />;
    }

    return (
      <Modal {...modalProps}>
        <View style={styles.modal}>
          {image}
          <View style={styles.modalContent}>
            <Text>{node.name}</Text>
          </View>
          <View style={styles.modalFooter}>
            <Link title="Visit node" onPress={this.navigateToNode.bind(this)}/>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    elevation: 4,
    margin: 5,
    backgroundColor: '#fff',
  },
  modalContent: {
    padding: 15
  },
  modalFooter: {
    borderTopColor: '#f0f0f0',
    borderTopWidth: 2,
    padding: 15
  }
});
