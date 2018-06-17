import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';

import * as actions from 'app/screens/User/screens/Notifications/actions';

class NotificationsIcon extends Component {
  componentDidMount() {
    this.props.dispatch(actions.fetchNotifications());
  }

  componentDidUpdate() {

  }

  render() {
    const { notifications } = this.props.notifications;

    let unreadNotifications = 0;
    if (notifications) {
      unreadNotifications = _.filter(notifications, (notification) => {
        return !notification.viewed_at;
      });
    }

    let count = null;
    if (unreadNotifications.length > 0) {
      count = (
        <View style={styles.notificationWrapper}>
          <Text style={styles.notificationText}>{unreadNotifications.length}</Text>
        </View>
      );
    }

    return (
      <View style={styles.wrapper}>
        <Icon name="bell" size={this.props.size} color={this.props.color}/>
        {count}
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
  wrapper: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
  },
  notificationWrapper: {
    backgroundColor: '#bc3b1f',
    borderRadius: 30,
    height: 24,
    overflow: 'hidden',
    position: 'absolute',
    right: 0,
    top: 0,
    width: 24,
  },
  notificationText: {
    color: '#fff',
    fontFamily: 'montserrat-semibold',
    fontSize: 12,
    lineHeight: 24,
    textAlign: 'center',
  }
};
