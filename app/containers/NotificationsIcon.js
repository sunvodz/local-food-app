import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class NotificationsIcon extends Component {
  componentDidMount() {
    // this.props.dispatch(actions.fetchNotifications());
  }

  render() {
    return (
      <View>
        <Icon name="bell" size={this.props.size} color={this.props.color}/>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { notifications, auth } = state;

  return {
    notifications,
    auth
  }
}

export default connect(mapStateToProps)(NotificationsIcon);

const styles = {

};
