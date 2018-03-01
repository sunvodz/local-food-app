import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class Empty extends Component {
  render() {
    return (
      <View style={styles.view}>
          <View style={styles.iconWrapper}>
              <Icon style={styles.icon} name={this.props.icon} />
          </View>
          <Text style={styles.header}>{this.props.header}</Text>
          <Text style={styles.text}>{this.props.text}</Text>
      </View>
    );
  }
}

const styles = {
  view: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
  iconWrapper: {
    alignItems: 'center',
    backgroundColor: '#bf360c',
    borderRadius: 200,
    height: 100,
    justifyContent: 'center',
    marginBottom: 15,
    width: 100,
  },
  icon: {
    color: '#fff',
    fontSize: 48,
  },
  header: {
    color: '#c4c4c0',
    fontFamily: 'montserrat-semibold',
    fontSize: 24,
    textAlign: 'center',
  },
  text: {
    color: '#c4c4c0',
    fontSize: 16,
    fontFamily: 'montserrat-regular',
    margin: 15,
    textAlign: 'center',
  }
};

export default Empty;
