import React from 'react';
import { View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ButtonComponent extends React.Component {
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

    let icon = null;
    let title = null;
    let onPress = this.props.onPress;

    if (this.props.title) {
      title = <Text style={mergedStyles.title}>{this.props.title.toUpperCase()}</Text>;
    }

    if (this.props.loading) {
      title = <ActivityIndicator color='#fff' size='small' />;
      onPress = null;
    }

    if (this.props.disabled) {
      icon = <Icon style={mergedStyles.icon} name='ban' />;
      onPress = null;
    } else if (this.props.icon) {
      icon = <Icon style={mergedStyles.icon} name={this.props.icon} />;
    }

    let subTitle = null;
    if (this.props.subTitle) {
      subTitle = <Text style={styles.subRow}>{this.props.subTitle}</Text>;
    }

    return (
      <TouchableOpacity onPress={onPress} style={[mergedStyles.button, this.props.disabled && styles.disabled]} activeOpacity={0.9}>
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
    borderRadius: 3,
    elevation: 1,
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  icon: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
    paddingHorizontal: 5,
  },
  title: {
    color: '#fff',
    alignSelf: 'center',
    fontFamily: 'montserrat-medium'
  },
  disabled: {
    backgroundColor: 'rgba(188, 59, 31, 0.6)',
  }
};
