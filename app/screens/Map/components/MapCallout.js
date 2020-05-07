import React from 'react';
import { ScrollView, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { NodeCard } from 'app/components';

export default class MapCallout extends React.Component {
  navigateToNode(node) {
    this.props.navigateToNode(node);
  }

  render() {
    const { node } = this.props;

    let modalProps = {
      backdropOpacity: 0.3,
      isVisible: true,
      onBackButtonPress: this.props.onClose,
      onBackdropPress: this.props.onClose,
    };

    return (
      <Modal {...modalProps}>
        <ScrollView style={styles.wrapper} showsVerticalScrollIndicator={false}>
          <NodeCard onClose={this.props.onClose} node={node} navigateToNode={this.navigateToNode.bind(this)} lang={this.props.lang} />
        </ScrollView>
      </Modal>
    );
  }
}

const styles = {
  wrapper: {
    marginTop: 65,
    maxHeight: Dimensions.get('window').height - 65,
  },
}
