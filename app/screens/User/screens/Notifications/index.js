import React from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import _ from 'lodash';

import AuthScreen from 'app/screens/Auth';

import { ContentWrapper, Empty } from 'app/components';

class Notifications extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(nextProps.notifications, this.props.notifications) || !_.isEqual(nextProps.auth, this.props.auth);
  }

  render() {
    const { notifications } = this.props.notifications;

    if (_.isEmpty(notifications)) {
      return <Empty icon="bell" header="You're up to date" text="There are no new notifications at the moment" />;
    }

    return (
      <ContentWrapper>
        <Text>Notifications here</Text>
      </ContentWrapper>
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
