import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

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

const styles = {
  badge: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e4e4e0',
    borderRadius: 100,
    height: 60,
    justifyContent: 'center',
    margin: 5,
    paddingVertical: 6,
    paddingHorizontal: 15,
    width: 60,
  },
  activeBadge: {
    backgroundColor: '#bf360c',
    borderColor: '#bf360c',
  },
  labelTop: {
    fontFamily: 'montserrat-semibold',
  },
  labelBottom: {
    color: '#999',
    fontFamily: 'montserrat-regular',
    fontSize: 11,
  },
  activeLabel: {
    color: '#fff',
  }
};
