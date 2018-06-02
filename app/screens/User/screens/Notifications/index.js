import React from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import _ from 'lodash';

import AuthScreen from 'app/screens/Auth';
import { ContentWrapper, Empty, ScreenHeader } from 'app/components';
import { trans } from 'app/shared';

class Notifications extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(nextProps.notifications, this.props.notifications) || !_.isEqual(nextProps.auth, this.props.auth);
  }

  render() {
    const { notifications } = this.props.notifications;

    let content = <Empty icon="bell" header={trans('no_notification', this.props.lang)} text={trans('no_notification_text', this.props.lang)} />;
    if (!_.isEmpty(notifications)) {
      content = (
        <ContentWrapper>
          <Text>Notifications here</Text>
        </ContentWrapper>
      );
    }

    return (
      <View style={{flex: 1}}>
        <ScreenHeader title={trans('notifications', this.props.lang)} right navigation={this.props.navigation} />
        {content}
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { auth, notifications } = state;

  return {
    auth,
    notifications,
  };
}


export default connect(mapStateToProps)(Notifications);
