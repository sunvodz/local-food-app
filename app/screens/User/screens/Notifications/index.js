import React from 'react';
import { connect } from 'react-redux';
import { View, ListView } from 'react-native';
import _ from 'lodash';
import moment from 'moment';

import { Empty, ScreenHeader, Loader, List, ListItem, Text } from 'app/components';
import { trans } from 'app/shared';
import * as actions from './actions';

const DataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class Notifications extends React.Component {
  componentDidMount() {
    this.props.dispatch(actions.fetchNotifications());
  }

  onRefresh() {
    this.props.dispatch(actions.fetchNotifications());
  }

  renderNotification(notification) {
    let notificationMessage = trans(notification.message, this.props.lang);

    _.each(notification.variables, (value, variable) => {
      notificationMessage = notificationMessage.replace(`{${variable}}`, value);
    });

    let listItemStyle = styles.listItem;
    listItemStyle.listItem.borderColor = !notification.viewed_at ? '#bf360c' : '#ddd';

    return (
      <ListItem key={notification.id} style={listItemStyle}>
        <View>
          <Text style={styles.title}>{trans(notification.title, this.props.lang)}</Text>
          <Text style={styles.message}>{notificationMessage}</Text>
          <Text style={styles.date}>{moment(notification.created_at).format('YYYY-MM-DD')}</Text>
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

const styles = {
  title: {
    fontFamily: 'montserrat-semibold',
  },
  message: {

  },
  strong: {
    fontFamily: 'montserrat-semibold',
  },
  date: {
    alignSelf: 'flex-end',
    fontFamily: 'montserrat-semibold',
    fontSize: 12,
    marginTop: 10,
    marginBottom: 5,
  },
  list: {
    list: {
      marginVertical: 15,
    }
  },
  listItem: {
    listItem: {
      borderBottomWidth: 0,
      borderLeftWidth: 5,
      borderColor: '#ddd',
      display: 'flex',
      flexDirection: 'column',
      marginBottom: 15,
      paddingBottom: 0,
    },
  }
};

function mapStateToProps(state) {
  const { auth, notifications } = state;

  return {
    auth,
    notifications,
  };
}

export default connect(mapStateToProps)(Notifications);
