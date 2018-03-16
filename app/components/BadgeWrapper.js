import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import Swiper from 'react-native-swiper'

export default class BadgeWrapper extends React.PureComponent {
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

    let children = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child);
    });

    let label = this.props.label || '';

    return (
      <View style={mergedStyles.badgeWrapper}>
        <Text style={mergedStyles.label}>{label}</Text>
        <ScrollView horizontal style={mergedStyles.scrollView}>
          {children}
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  badgeWrapper: {
  },
  scrollView: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  label: {
    fontFamily: 'montserrat-semibold',
    marginBottom: 5,
  },
};
