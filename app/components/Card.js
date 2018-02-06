import React from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';

export default class Card extends React.Component {
  mergeStyles() {
    let mergeStyles = {};

    Object.keys(styles).map(key => {
      mergeStyles[key] = styles[key];

      if (this.props.style && this.props.style[key]) {
        mergeStyles[key] = Object.assign({}, styles[key], this.props.style[key]);
      }
    });

    return mergeStyles;
  }

  render() {
    let mergedStyles = this.mergeStyles();

    let header = null;
    if (this.props.header) {
      header = <Text style={mergedStyles.header}>{this.props.header}</Text>;
    }

    let touchableOpacityProps = {
      activeOpacity: 1,
      onPress: null,
    };

    if (this.props.onPress) {
      touchableOpacityProps.onPress = this.props.onPress;
    }

    let image = null;
    if (this.props.image) {
      const dimensions = Dimensions.get('window');
      const imageHeight = Math.round(dimensions.width * 9 / 16);
      const imageWidth = dimensions.width;

      image = <Image source={{uri: this.props.image}} style={{width: imageWidth, height: imageHeight}} />;
    }

    return (
      <TouchableOpacity {...touchableOpacityProps}>
        <View style={mergedStyles.card}>
          {image}
          {header}
          <View style={mergedStyles.content}>
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
    elevation: 0,
    margin: 5,
    marginBottom: 15,
    // width: '50%'
  },
  content: {
    padding: 15,
  },
  header: {
    color: '#333',
    fontSize: 16,
    fontFamily: 'montserrat-bold',
    paddingHorizontal: 15,
    paddingTop: 15,
  }
};
