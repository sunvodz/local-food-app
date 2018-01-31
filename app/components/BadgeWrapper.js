import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class BadgeWrapper extends React.PureComponent {
  render() {

    let children = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child);
    });

    let label = this.props.label || '';
    
    return (
      <View>
        <Text style={styles.label}>{label.toUpperCase()}</Text>
        <View style={styles.badgeWrapper}>
          {children}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  badgeWrapper: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection:'row',
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
  },
});
