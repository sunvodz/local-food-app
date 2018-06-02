import React from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import styleMerger from 'app/shared/utils/styleMerger';

export default class Card extends React.Component {
  render() {
    let mergedStyles = styleMerger.merge(styles, this.props.style);

    let headerInside = null;
    let headerOutside = null;
    if (this.props.header) {
      if (this.props.headerPosition === 'outside') {
        headerOutside = <Text style={mergedStyles.headerOutside}>{this.props.header}</Text>;
      } else {
        headerInside = <Text style={mergedStyles.headerInside}>{this.props.header}</Text>;
      }
    }

    let columnWidth = '100%';
    if (this.props.column) {
      columnWidth = (100 / this.props.column) + '%';
    }

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

    let image = null;
    if (this.props.image) {
      const dimensions = Dimensions.get('window');
      const imageHeight = Math.round(dimensions.width * 9 / 16);
      const imageWidth = dimensions.width;

      image = <Image source={{uri: this.props.image}} style={{width: imageWidth, height: imageHeight}} />;
    }

    let footer = null;
    if (this.props.footer) {
      footer = (
        <View style={mergedStyles.footer}>
          {this.props.footer}
        </View>
      );
    }

    return (
      <TouchableOpacity {...touchableOpacityProps}>
        {headerOutside}
        <View style={mergedStyles.card}>
          {image}
          {headerInside}
          <View style={mergedStyles.content}>
            {this.props.children}
          </View>
        </View>
        {footer}
      </TouchableOpacity>
    );
  }
}

const styles = {
  card: {
    backgroundColor: '#fff',
    elevation: 0,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 15,
  },
  content: {
    padding: 15,
  },
  headerInside: {
    color: '#333',
    fontSize: 16,
    fontFamily: 'montserrat-semibold',
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  headerOutside: {
    fontFamily: 'montserrat-semibold',
    color: '#333',
    marginTop: 15,
    marginBottom: 2,
    marginLeft: 5,
    marginRight: 5,
  },
  footer: {
    backgroundColor: '#fff',
    borderTopColor: '#f0f0f0',
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    marginTop: 0,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 15,
  }
};
