import React from 'react';
import { connect } from 'react-redux';
import { Text, View, Button } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';

import AuthScreen from '../Auth';
import { Header, TextInput, ContentWrapper, Card } from '../../components';

import * as actions from './actions';

class NodeScreen extends React.Component {
  render() {
    let content = null;

    if (this.props.auth.loading) {
      return <Text>Loading...</Text>;
    }

    if (!this.props.auth.user) {
       content = <AuthScreen {...this.props} />;
    }

    if (this.props.auth.user) {
      content = (
        <View>
          <Text>{this.props.auth.user.name} is logged in!</Text>
        </View>
      );
    }

    return (
      <View style={{flex: 1}}>
        <Header label='Nodes' />
        <ContentWrapper>
          {content}
        </ContentWrapper>
        <DropdownAlert ref={ref => this.dropdownAlert = ref} />
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { auth, node } = state;

  return {
    auth,
    node,
  }
}

export default connect(mapStateToProps)(NodeScreen);
