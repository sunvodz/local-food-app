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
    const imageWidth = Math.round(dimensions.width / column);
    const imageHeight = Math.round(imageWidth * 0.8);
    let imageProps = {
      source: require('../../assets/images/product-placeholder.jpg'), // Product fallback image
      style: {
        width: imageWidth,
        height: imageHeight,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
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
    borderRadius: 3,
  },
  header: {
    color: '#333',
    fontFamily: 'montserrat-semibold',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
};
