import React from 'react';
import { View, Text, ImageBackground, Dimensions } from 'react-native';

import Link from './Link';
import { trans } from 'app/shared';
import { FontAwesome as Icon } from '@expo/vector-icons';
import globalStyle from 'app/styles';

export default class NodeCard extends React.Component {
  navigateToNode() {
    this.props.navigateToNode(this.props.node);
  }

  removeNode() {
    this.props.removeNode(this.props.node.id);
  }

  render() {
    const { node } = this.props;

    let remove = this.props.removeNode ? <Link title={trans('Remove', this.props.lang)} onPress={this.removeNode.bind(this)}/> : null;

    let imageProps = {
      source: require('../../assets/images/node-placeholder.jpg'), // Product fallback image
      style: styles.modalHeaderImage,
    }

    if (node.images && node.images.length > 0) {
      imageProps.source = {uri: node.images[0].urls.small};
    }

    let modalHeader = (
      <ImageBackground {...imageProps}>
        {/* <View style={styles.timeBadge}>
          <Icon style={styles.timeIcon} name='clock-o' />
          <Text style={styles.timeText}>{trans(node.delivery_weekday, this.props.lang)} {node.delivery_time}</Text>
        </View> */}
      </ImageBackground>
    );

    return (
      <View style={styles.modal}>
        {modalHeader}
        <View style={styles.modalBody}>
          <Text style={styles.title}>{node.name}</Text>
          <View style={styles.row}>
            <Text style={styles.text}>{node.address} {node.zip} {node.city}</Text>
          </View>
        </View>
        <View style={styles.modalFooter}>
          <Link title={trans('Visit node', this.props.lang)} onPress={this.navigateToNode.bind(this)}/>
          {remove}
        </View>
      </View>
    );
  }
}

let styles = {
  modal: {
    backgroundColor: '#fff',
    elevation: 0,
    marginVertical: 5,
    overflow: 'hidden',
  },
  modalHeader: {
    backgroundColor: '#efcec4',
    height: 200,
  },
  modalHeaderImage: {
    width: Dimensions.get('window').width - 30,
    height: Dimensions.get('window').width / 1.5,
  },
  modalBody: {
    margin: 15,
  },
  timeBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 15,
    color: '#fff',
    flexDirection: 'row',
    marginLeft: 15,
    marginTop: 15,
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  timeIcon: {
    color: '#fff',
    fontSize: 16,
    marginRight: 5,
  },
  timeText: {
    color: '#fff',
    fontFamily: 'montserrat-semibold',
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 5,
  },
  icon: {
    color: '#333',
    fontSize: 16,
    marginRight: 5,
    width: 16,
  },
  title: {
    fontFamily: 'montserrat-regular',
    fontSize: 24,
  },
  text: {
    fontFamily: 'montserrat-regular',
  },
  modalFooter: {
    borderTopColor: globalStyle.backgroundColor,
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  }
};
