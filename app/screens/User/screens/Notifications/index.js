import React from 'react';
import { connect } from 'react-redux';
import { View, ListView, Text } from 'react-native';
import _ from 'lodash';
import moment from 'moment/min/moment-with-locales';

import { Empty, ScreenHeader, Loader, List, ListItem } from 'app/components';
import { trans } from 'app/shared';
import * as actions from './actions';

const DataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    moment.locale(props.lang);
  }

  componentDidMount() {
    this.props.dispatch(actions.fetchNotifications());

    if (this.props.navigation.state.routeName = 'Notifications') {
      this.props.dispatch(actions.resetNotifications());
    }
  }

  onRefresh() {
    this.props.dispatch(actions.fetchNotifications());
  }

  renderNotification(notification) {
    let notificationMessage = trans(notification.message, this.props.lang);

    _.each(notification.variables, (value, variable) => {
      notificationMessage = notificationMessage.replace(`{${variable}}`, value);
    });

    let itemStyle = !notification.viewed_at ? unread : read;

    return (
      <ListItem key={notification.id} style={itemStyle.listItem}>
        <View>
          <Text style={itemStyle.title}>{trans(notification.title, this.props.lang)}</Text>
          <Text style={itemStyle.message}>{notificationMessage}</Text>
          <Text style={itemStyle.date}>{moment(notification.created_at).fromNow()}</Text>
        </View>
      </ListItem>
    );
  }

  render() {
    const { notifications, loading, refreshing } = this.props.notifications;

    if (loading) {
      return (
        <View style={{flex: 1}}>
          <ScreenHeader title={trans('notifications', this.props.lang)} right navigation={this.props.navigation} />
          <Loader />
        </View>
      );
    }

    if (_.isEmpty(notifications) && !loading) {
      return (
        <View style={{flex: 1}}>
          <ScreenHeader title={trans('notifications', this.props.lang)} right navigation={this.props.navigation} />
          <Empty icon="bell" header={trans('no_notification', this.props.lang)} text={trans('no_notification_text', this.props.lang)} />
        </View>
      );
    }

    let listProps = {
      dataSource: DataSource.cloneWithRows(notifications),
      renderRow: this.renderNotification.bind(this),
      onRefresh: this.onRefresh.bind(this),
      refreshing: refreshing,
    }

    return (
      <View style={{flex: 1}}>
        <ScreenHeader title={trans('notifications', this.props.lang)} right navigation={this.props.navigation} />
        <List {...listProps} style={styles.list} />
      </View>
    );
  }
}

let styles = {
  list: {
    list: {
      paddingTop: 15,
      paddingBottom: 15,
    }
  },
}

let read = {
  title: {
    color: '#333',
    fontFamily: 'montserrat-semibold',
  },
  message: {
    color: '#333',
    fontFamily: 'montserrat-regular',
  },
  date: {
    alignSelf: 'flex-end',
    color: '#333',
    fontFamily: 'montserrat-semibold',
    fontSize: 12,
    marginTop: 10,
    marginBottom: 5,
  },
  listItem: {
    listItem: {
      backgroundColor: '#fff',
      display: 'flex',
      flexDirection: 'column',
      marginBottom: 15,
      paddingBottom: 0,
    },
  },
};

let unread = {
  title: {
    color: '#fff',
    fontFamily: 'montserrat-semibold',
  },
  message: {
    color: '#fff',
    fontFamily: 'montserrat-regular',
  },
  date: {
    alignSelf: 'flex-end',
    color: '#fff',
    fontFamily: 'montserrat-semibold',
    fontSize: 12,
    marginTop: 10,
    marginBottom: 5,
  },
  listItem: {
    listItem: {
      backgroundColor: '#ff9800',
      display: 'flex',
      flexDirection: 'column',
      marginBottom: 15,
      paddingBottom: 0,
    },
  },
}

function mapStateToProps(state) {
  const { auth, notifications } = state;

  return {
    auth,
    notifications,
  };
}

export default connect(mapStateToProps)(Notifications);
