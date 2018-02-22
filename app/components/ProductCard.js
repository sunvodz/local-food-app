import React from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';

export default class ProductCard extends React.Component {
  render() {
    let column = this.props.column || 1;
    let columnWidth = (100 / column) + '%';

    let touchableOpacityProps = {
      activeOpacity: 1,
      onPress: null,
      style: {
        width: columnWidth,
      }
    };

    if (this.props.onPress) {
      touchableOpacityProps.onPress = this.props.onPress;
    }

    const dimensions = Dimensions.get('window');
    const imageHeight = Math.round((dimensions.width / column) * 9 / 16);
    const imageWidth = dimensions.width / column;
    let imageProps = {
      source: require('../../assets/images/product-placeholder.jpg'), // Product fallback image
      style: {
        width: imageWidth,
        height: imageHeight
      }
    }

    if (this.props.image) {
      imageProps.source = {uri: this.props.image};
    }

    let image = <Image {...imageProps} />;

    return (
      <TouchableOpacity {...touchableOpacityProps}>
        <View style={styles.card}>
          {image}
          <Text numberOfLines={1} style={styles.header}>{this.props.header}</Text>
          <View style={styles.content}>
            {this.props.children}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = {
  card: {
    backgroundColor: '#fff',
    elevation: 2,
    margin: 10,
  },
  content: {
    padding: 15,
  },
  header: {
    color: '#333',
    fontSize: 16,
    fontFamily: 'montserrat-semibold',
    paddingHorizontal: 15,
    paddingTop: 15,

  },
};
