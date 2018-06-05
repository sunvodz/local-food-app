import React from 'react';
import { View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styleMerger from 'app/shared/utils/styleMerger';

export default class ButtonComponent extends React.Component {
  render() {
    let mergedStyles = styleMerger.merge(styles, this.props.style);

    let title = null;
    let icon = null;
    let onPress = this.props.onPress;

    if (this.props.title) {
      title = <Text style={mergedStyles.title}>{this.props.title.toUpperCase()}</Text>;
    }

    if (this.props.icon) {
      icon = <Icon style={mergedStyles.icon} name={this.props.icon} />;
    }

    if (this.props.loading) {
      onPress = null;
    } else if (this.props.disabled) {
      icon = <Icon style={mergedStyles.icon} name='ban' />;
      onPress = null;
    }

    return (
      <TouchableOpacity onPress={onPress} style={[mergedStyles.button, (this.props.disabled || this.props.loading) && styles.disabled]}>
        {icon}
        {title}
      </TouchableOpacity>
    );
  }
}

const styles = {
  button: {
    alignSelf: 'center',
    backgroundColor: '#bc3b1f',
    borderRadius: 100,
    elevation: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    paddingVertical: 8,
  },
  icon: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 12,
    paddingRight: 5,
  },
  title: {
    color: '#fff',
    alignSelf: 'center',
    fontFamily: 'montserrat-semibold',
    marginBottom: 1,
  },
  disabled: {
    opacity: 0.6,
  },
};
