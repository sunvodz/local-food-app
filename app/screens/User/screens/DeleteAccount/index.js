import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';

import { ContentWrapper, Card, Loader, Button, ScreenHeader } from 'app/components';

class DeleteAccount extends Component {
  deleteAccount() {
    this.props.navigation.state.params.deleteAccount();
  }

  render() {
    return (
      <View>
        <ScreenHeader title='Delete Account' left navigation={navigation} />
        <ContentWrapper>
          <Card>
            <Text>Are you sure you want to delete your account?</Text>
          </Card>

          <Button title="Delete account" onPress={this.deleteAccount.bind(this)} />
        </ContentWrapper>
      </View>
    );
  }
}

export default DeleteAccount;
