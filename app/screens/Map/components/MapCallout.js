import React from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, Dimensions, Image } from 'react-native';
import Modal from 'react-native-modal';
import _ from 'lodash';

import { ContentWrapper, Loader, Button } from 'app/components';

export default class MapCallout extends React.Component {
  navigateToNode() {
    this.props.navigateToNode(this.props.node);
  }

  render() {
    const { node } = this.props;

    let modalProps = {
      animationInTiming: 1, 
      animationOutTiming: 1,
      isVisible: true,
      onBackButtonPress: this.props.onClose,
      onBackdropPress: this.props.onClose,
      backdropOpacity: 0.2,
      style: {
        elevation: 4
      }
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
        {image}
        <View style={styles.modal}>
          <Text>{node.name}</Text>
          <Button title="Visit node" onPress={this.navigateToNode.bind(this)}/>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
    modal: {
      backgroundColor: '#fff',
     
      padding: 20
    }
});
