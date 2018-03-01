import React, { Component } from 'react';
import { View, ImageBackground, Text, StatusBar, Picker } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class NodeHeader extends Component {
  render() {
    const node = this.props.node;

    // Image source
    let imageSource = null;
    if (false) {
        // imageSource = require('../../assets/images/product-placeholder.jpg');
    }

    return (
      <View>
        <ImageBackground source={imageSource} style={styles.view}>
          <View style={styles.content}>
            <Text style={styles.node.address}>{node.address}, {node.zip}, {node.city}</Text>
          </View>
        </ImageBackground>
        <View style={styles.pickerWrapper}>
          <Icon name="calendar" style={styles.pickerIcon} />
          <Picker style={styles.picker}
            selectedValue="test"
            onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
            <Picker.Item label="Filter products on pickup date" value="0" />
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>
        </View>
      </View>
    );
  }
}

const styles = {
  view: {
    backgroundColor: '#bf360c',
    height: 150,
    justifyContent: 'flex-end',
  },
  content: {
    padding: 15,
  },
  node: {
    title: {
      color: '#fff',
      fontFamily: 'montserrat-semibold',
      marginBottom: 5,
    },
    address: {
      color: '#fff',
      fontFamily: 'montserrat-regular',
    }
  },
  pickerWrapper: {
    backgroundColor: '#ebebeb',
    flexDirection: 'row',
    paddingTop: 5,
  },
  pickerIcon: {
    flex: 1,
    color: '#999',
    fontSize: 24,
    margin: 15,
  },
  picker: {
    flex: 10,
    color: '#333',
  },
};

export default NodeHeader;
