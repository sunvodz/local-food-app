import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class UserIcon extends Component {
  render() {
    return (
      <Icon name="globe" size={this.props.size} color={this.props.color} />
    );
  }
}

function mapStateToProps(state) {
  const { auth } = state;

  return {
    auth,
  }
}

export default connect(mapStateToProps)(UserIcon);

const styles = {
};
