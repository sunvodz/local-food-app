import React from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import _ from 'lodash';

import SmallHeader from 'app/navigations/headers/SmallHeader';
import AuthScreen from 'app/screens/Auth';

import { ContentWrapper, Empty } from 'app/components';

class Notifications extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(nextProps.notifications, this.props.notifications) || !_.isEqual(nextProps.auth, this.props.auth);
  }

  render() {
    const { notifications } = this.props.notifications;

    let content = <Empty icon="bell" header="You're up to date" text="There are no new notifications at the moment" />;
    if (!_.isEmpty(notifications)) {
      content = (
        <ContentWrapper>
          <Text>Notifications here</Text>
        </ContentWrapper>
      );
    }

    return (
      <View style={{flex: 1}}>
        <SmallHeader title='Notifications' right navigation={this.props.navigation} />
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
