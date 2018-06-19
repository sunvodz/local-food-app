import React from 'react';
import { View, Text } from 'react-native';

import { Link } from 'app/components';
import { trans } from 'app/shared';
import Icon from 'react-native-vector-icons/FontAwesome';
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

    let remove = this.props.removeNode ? <Link title={trans('remove', this.props.lang)} onPress={this.removeNode.bind(this)}/> : null;

    return (
      <View style={styles.modal}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>{node.name}</Text>
          <View style={styles.row}>
            <Icon style={styles.icon} name='map-marker' />
            <Text style={styles.text}>{node.city}</Text>
          </View>
          <View style={styles.row}>
            <Icon style={styles.icon} name='home' />
            <Text style={styles.text}>{node.address} {node.zip}</Text>
          </View>
          <View style={styles.row}>
            <Icon style={styles.icon} name='clock-o' />
            <Text style={styles.text}>{trans(node.delivery_weekday, this.props.lang)} {node.delivery_time}</Text>
          </View>
          <View style={styles.row}>
            <Icon style={styles.icon} name='envelope' />
            <Text style={styles.text}>{node.email}</Text>
          </View>
        </View>
        <View style={styles.modalFooter}>
          <Link title={trans('go_to_node', this.props.lang)} onPress={this.navigateToNode.bind(this)}/>
          {remove}
        </View>
      </View>
    );
  }
}

let styles = {
  modal: {
    elevation: 0,
    marginVertical: 5,
    backgroundColor: '#fff',
  },
  modalContent: {
    margin: 15,
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
    fontFamily: 'montserrat-semibold',
    fontSize: 20,
  },
  text: {
    fontFamily: 'montserrat-regular',
  },
  modalFooter: {
    borderTopColor: globalStyle.backgroundColor,
    borderTopWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  }
};
