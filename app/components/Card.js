import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';

export default class Card extends React.Component {
  render() {
    let styles = {};
    Object.keys(defaultStyles).map(key => {
      styles[key] = defaultStyles[key];
      if (this.props.style && this.props.style[key]) {
        styles[key] = Object.assign({}, defaultStyles[key], this.props.style[key]);
      }
    });

    let header = null;
    if (this.props.header) {
      header = <Text style={styles.header}>{this.props.header.toUpperCase()}</Text>;
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
        <View style={styles.card}>
          {image}
          {header}
          <View style={styles.content}>
            {this.props.children}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const defaultStyles = {
  card: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 20,
  },
  content: {
    padding: 10,
  },
  header: {
    color: '#333',
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingTop: 10,
  }
};
