import React, { Component } from 'react';
import { View, ImageBackground, Text, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class ProductHeader extends Component {
  goBack() {
    this.props.navigation.goBack();
  }

  render() {
    // Image source
    let imageSource = null;
    if (false) {
        imageSource = require('../../assets/images/product-placeholder.jpg');
    }

    return (
      <ImageBackground source={imageSource} style={styles.view}>
        <View style={styles.top}>
            <Icon name="chevron-left" style={{color: '#fff', padding: 15, fontSize: 24}} onPress={this.goBack.bind(this)} />
        </View>
      </ImageBackground>
    );
  }
}

const styles = {
  view: {
    backgroundColor: '#bf360c',
    height: 200,
    paddingTop: StatusBar.currentHeight,
  },
  top: {
  }
};

export default ProductHeader;
