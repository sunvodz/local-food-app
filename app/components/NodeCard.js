import React from 'react';
import { View, Text, ImageBackground, Dimensions, ScrollView } from 'react-native';
import { FontAwesome as Icon } from '@expo/vector-icons';
import Link from './Link';
import { trans } from 'app/shared';
import globalStyle from 'app/styles';

export default class NodeCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showInfo: false
    };
  }

  navigateToNode() {
    this.props.navigateToNode(this.props.node);
  }

  removeNode() {
    this.props.removeNode(this.props.node.id);
  }

  toggleInfo() {
    this.setState({
      showInfo: !this.state.showInfo
    });
  }

  render() {
    const { node } = this.props;

    let remove = this.props.removeNode ? <Link title={trans('Remove', this.props.lang)} onPress={this.removeNode.bind(this)}/> : null;

    let imageProps = {
      source: require('../../assets/images/node-placeholder.jpg'), // Node fallback image
      style: styles.modalHeaderImage,
    }

    if (node.images && node.images.length > 0) {
      imageProps.source = {uri: node.images[0].urls.small};
    }

    let modalHeader = (
      <ImageBackground {...imageProps}></ImageBackground>
    );

    let nextDelivery = null;
    if (node.next_delivery) {
      nextDelivery = (
        <View style={styles.textRow}>
          <Icon style={styles.timeIcon} name='clock-o' />
          <Text style={styles.text}>{node.next_delivery.date} {node.next_delivery.from} - {node.next_delivery.to}</Text>
        </View>
      );
    }

    let info = null;
    let toggleInfoLinkText = trans('Read more', this.props.lang);
    if (this.state.showInfo) {
      info = (
        // <ScrollView style={styles.infoScrollView}>
          <Text style={styles.info}>{node.infoRaw}</Text>
        // </ScrollView>
      );
      toggleInfoLinkText = trans('Read less', this.props.lang);
    }

    return (
      <View style={styles.modal}>
        {modalHeader}
        <View style={styles.modalBody}>
          <Text style={styles.title}>{node.name}</Text>
          <View>
            {nextDelivery}
            <View style={styles.textRow}>
              <Icon style={styles.locationIcon} name='map-marker' />
              <Text style={styles.text}>{node.address}, {node.zip} {node.city}</Text>
            </View>
            {info}
            <Text style={styles.toggleInfoLink} onPress={this.toggleInfo.bind(this)}>{toggleInfoLinkText}</Text>
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
    flex: 1,
    marginVertical: 5,
    overflow: 'hidden',
  },
  modalHeader: {
    backgroundColor: '#efcec4',
    height: 200,
  },
  modalHeaderImage: {
    width: Dimensions.get('window').width - 30,
    height: Dimensions.get('window').width / 2,
  },
  modalBody: {
    margin: 15,
  },
  timeIcon: {
    fontSize: 14,
    marginTop: 2,
    width: 20,
  },
  locationIcon: {
    fontSize: 14,
    marginLeft: 2,
    marginTop: 2,
    width: 18,
  },
  textRow: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  title: {
    fontFamily: 'montserrat-regular',
    fontSize: 24,
    marginBottom: 15,
  },
  text: {
    flex: 1,
    fontFamily: 'montserrat-regular',
    marginRight: 10,
  },
  modalFooter: {
    borderTopColor: globalStyle.backgroundColor,
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  toggleInfoLink: {
    fontFamily: 'montserrat-regular',
    color: '#999',
    marginTop: 10,
  },
  infoScrollView: {
    height: 200,
  },
  info: {
    fontFamily: 'montserrat-regular',
    marginTop: 15,
  }
};
