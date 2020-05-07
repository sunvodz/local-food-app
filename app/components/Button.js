import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { FontAwesome as Icon } from '@expo/vector-icons';
import styleMerger from 'app/shared/utils/styleMerger';
import globalStyle from 'app/styles';

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

    if (onPress) {
      return (
        <TouchableOpacity onPress={onPress} style={[mergedStyles.button, (this.props.disabled || this.props.loading) && mergedStyles.disabled]}>
          {icon}
          {title}
        </TouchableOpacity>
      );
    } else {
      return (
        <View style={[mergedStyles.button, (this.props.disabled || this.props.loading) && mergedStyles.disabled]}>
          {icon}
          {title}
        </View>
      );
    }
  }
}

let styles = {
  button: {
    alignSelf: 'center',
    backgroundColor: '#ff9800',
    borderRadius: 100,
    elevation: 0,
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
    fontSize: 12,
    marginBottom: 1,
  },
  disabled: {
    opacity: 0.5,
  },
};
