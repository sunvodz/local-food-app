import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import globalStyle from 'app/styles';

export default class BadgeDate extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} style={[styles.badge, this.props.selected && styles.activeBadge]}>
        <Text style={[styles.labelTop, this.props.selected && styles.activeLabel]}>{this.props.labelTop}</Text>
        <Text style={[styles.labelBottom, this.props.selected && styles.activeLabel]}>{this.props.labelBottom}</Text>
      </TouchableOpacity>
    );
  }
}

let styles = {
  badge: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 100,
    height: 60,
    justifyContent: 'center',
    margin: 5,
    paddingVertical: 6,
    paddingHorizontal: 15,
    width: 60,
  },
  activeBadge: {
    backgroundColor: globalStyle.primaryColor,
    borderColor: globalStyle.primaryColor,
  },
  labelTop: {
    fontFamily: 'montserrat-semibold',
  },
  labelBottom: {
    color: '#666',
    fontFamily: 'montserrat-regular',
    fontSize: 11,
  },
  activeLabel: {
    color: '#fff',
  }
};
