import React, { Component } from 'react';
import { View, ImageBackground, Text, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class ProductHeader extends Component {
  render() {
    const producer = this.props.product.producer_relationship;

    // Image source
    let imageSource = null;
    if (false) {
        // imageSource = require('../../assets/images/product-placeholder.jpg');
    }

    return (
      <ImageBackground source={imageSource} style={styles.view}>
        <View style={styles.content}>
          <Text style={styles.producer.title}>{producer.name}</Text>
          <Text style={styles.producer.address}>{producer.address}, {producer.zip}, {producer.city}</Text>
        </View>
      </ImageBackground>
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
  producer: {
    title: {
      color: '#fff',
      fontFamily: 'montserrat-semibold',
      marginBottom: 5,
    },
    address: {
      color: '#fff',
      fontFamily: 'montserrat-regular',
    }
  }
};

export default ProductHeader;
