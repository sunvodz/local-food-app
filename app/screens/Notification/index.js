import React from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';

import AuthScreen from '../Auth';
import * as authActions from '../Auth/actions';

import { Header, ContentWrapper } from '../../components';

class NotificationScreen extends React.Component {
  componentDidMount() {
    this.props.dispatch(authActions.fetchUser());
  }

  componentDidUpdate(prevProps, prevState) {
    const alert = this.props.notification && this.props.notification.alert ? this.props.notification.alert : null;

    if (alert && this.dropdownAlert) {
      this.props.dispatch(actions.resetAlert());
      this.dropdownAlert.alertWithType(alert.type, alert.label, alert.message);
    }
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
        <Header label='Notifications' />
        <ContentWrapper>
          {content}
        </ContentWrapper>
        <DropdownAlert ref={ref => this.dropdownAlert = ref} />
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
