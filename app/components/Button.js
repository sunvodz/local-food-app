import React from 'react';
import { View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styleMerger from 'app/shared/utils/styleMerger';

export default class ButtonComponent extends React.Component {
  render() {
    let mergedStyles = styleMerger.merge(styles, this.props.style);

    let icon = null;
    let title = null;
    let onPress = this.props.onPress;

    if (this.props.title) {
      title = <Text style={mergedStyles.title}>{this.props.title.toUpperCase()}</Text>;
    }

    if (this.props.loading) {
      icon = (
        <View style={mergedStyles.loaderWrapper}>
          <ActivityIndicator color={mergedStyles.loader.color} size='small' />
        </View>
      );
      onPress = null;
    } else if (this.props.disabled) {
      icon = <Icon style={mergedStyles.icon} name='ban' />;
      onPress = null;
    } else if (this.props.icon) {
      icon = <Icon style={mergedStyles.icon} name={this.props.icon} />;
    }

    return (
      <TouchableOpacity onPress={onPress} style={[mergedStyles.button, this.props.disabled && styles.disabled, this.props.loading && styles.loading]} activeOpacity={0.9}>
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
    paddingLeft: 20,
    paddingRight: 30,
    paddingVertical: 12,
  },
  icon: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 20,
    paddingLeft: 5,
    paddingRight: 5,
  },
  title: {
    color: '#fff',
    alignSelf: 'center',
    fontFamily: 'montserrat-medium',
    marginBottom: 1,
  },
  disabled: {
    backgroundColor: 'rgba(188, 59, 31, 0.6)',
  },
  loaderWrapper: {
    paddingRight: 5,
    paddingLeft: 13,
  },
  loader: {
    color: '#fff',
  },
  loading: {
    paddingLeft: 10,
  }
};
