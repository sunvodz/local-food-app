import React from 'react';
import { View, StyleSheet } from 'react-native';

export default class BadgeWrapper extends React.PureComponent {
  render() {

    let children = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child);
    });

    return (
      <View style={styles.badgeWrapper}>{children}</View>
    );
  }
}

const styles = StyleSheet.create({
  badgeWrapper: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection:'row',
  }
});
