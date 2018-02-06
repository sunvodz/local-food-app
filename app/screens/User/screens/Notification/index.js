import React from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';

import AuthScreen from 'app/screens/Auth';

import { ContentWrapper } from 'app/components';

class NotificationScreen extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(nextProps.notifications, this.props.notifications) || !_.isEqual(nextProps.auth, this.props.auth);
  }

  render() {
    let content = null;

    if (this.props.auth.loading) {
      return <Text>Loading...</Text>;
    }

    if (!this.props.auth.user) {
      content = <AuthScreen {...this.props} />;
    }

    if (this.props.auth.user) {
      content = <Text>Notifications for {this.props.auth.user.name}</Text>;
    }

    return (
      <View style={{flex: 1}}>
        <ContentWrapper>
          {content}
        </ContentWrapper>
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


export default connect(mapStateToProps)(NotificationScreen);
