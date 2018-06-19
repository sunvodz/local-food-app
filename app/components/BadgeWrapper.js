import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import styleMerger from 'app/shared/utils/styleMerger';

export default class BadgeWrapper extends React.PureComponent {
  render() {
    let mergedStyles = styleMerger.merge(styles, this.props.style);

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

let styles = {
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
