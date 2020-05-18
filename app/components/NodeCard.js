import React from 'react';
import { View, Text, ImageBackground, Dimensions } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { FontAwesome as Icon } from '@expo/vector-icons';
import Link from './Link';
import { trans } from 'app/shared';
import globalStyle from 'app/styles';

export default class NodeCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      readMore: false
    };
  }

  componentDidMount() {
    ScreenOrientation.addOrientationChangeListener((orientationChangeEvent) => {

    });
  }

  navigateToNode() {
    this.props.navigateToNode(this.props.node);
  }

  removeNode() {
    this.props.removeNode(this.props.node.id);
  }

  toggleInfo() {
    this.setState({
      readMore: !this.state.readMore
    });
  }

  render() {
    const { node } = this.props;

    let remove = this.props.removeNode ? <Link title={trans('Remove', this.props.lang)} onPress={this.removeNode.bind(this)}/> : null;

    let modalHeader = null;
    if (node.images && node.images.length > 0) {
      modalHeader = (
        <ImageBackground style={styles.modalHeaderImage} source={{uri: node.images[0].urls.small}}></ImageBackground>
      );
    } else if (this.props.imageFallback) {
      modalHeader = (
        <ImageBackground style={styles.modalHeaderImage} source={require('../../assets/images/node-placeholder.jpg')}></ImageBackground>
      );
    }


    let nextDelivery = null;
    if (node.next_delivery) {
      nextDelivery = (
        <View style={styles.textRow}>
          <Icon style={styles.timeIcon} name='clock-o' />
          <Text style={styles.text}>{node.next_delivery.date} {node.next_delivery.from} - {node.next_delivery.to}</Text>
        </View>
      );
    }

    let nodeInfo = node.infoRaw;
    let toggleInfo = null;
    if (nodeInfo.length > 100 && !this.state.readMore) {
      nodeInfo = nodeInfo.substr(0, 140) + '...';
      toggleInfo = <Text style={styles.toggleInfoLink} onPress={this.toggleInfo.bind(this)}>{trans('Read more', this.props.lang)}</Text>;
    } else if (nodeInfo.length > 100 && this.state.readMore) {
      toggleInfo = <Text style={styles.toggleInfoLink} onPress={this.toggleInfo.bind(this)}>{trans('Read less', this.props.lang)}</Text>;
    }

    let onClose = null;
    if (this.props.onClose) {
      onClose = <Link title={trans('Close', this.props.lang)} onPress={this.props.onClose}/>
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
            <Text style={styles.info}>{nodeInfo}</Text>
            {toggleInfo}
          </View>
        </View>
        <View style={styles.modalFooter}>
          <Link title={trans('Visit node', this.props.lang)} onPress={this.navigateToNode.bind(this)}/>
          {remove}
          {onClose}
        </View>
      </View>
    );
  }
}

let styles = {
  modal: {
    backgroundColor: '#fff',
    elevation: 0,
    overflow: 'hidden',
    position: 'relative',
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
    fontSize: 20,
    marginBottom: 5,
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
  },
};
