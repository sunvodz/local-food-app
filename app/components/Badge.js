import React from 'react';
import { Text } from 'react-native';
import globalStyle from 'app/styles';
import styleMerger from 'app/shared/utils/styleMerger';

export default class Badge extends React.Component {
  render() {
    let mergedStyles = styleMerger.merge(styles, this.props.style);

    return (
      <Text style={mergedStyles.badge}>{this.props.label}</Text>
    );
  }
}

let styles = {
  badge: {
    backgroundColor: globalStyle.primaryColor,
    borderRadius: 15,
    color: '#fff',
    alignSelf: 'flex-start',
    fontFamily: 'montserrat-semibold',
    margin: 5,
    overflow: 'hidden',
    paddingVertical: 6,
    paddingHorizontal: 15,
  },
};
