import React from 'react';
import { connect } from 'react-redux';
import { Text, View, Button } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';

import AuthScreen from '../Auth';
import { Header, TextInput, ContentWrapper, Card } from '../../components';

import * as actions from './actions';
import * as authActions from '../Auth/actions';

class NodeScreen extends React.Component {
  componentDidMount() {
    this.props.dispatch(authActions.fetchUser());
  }

  componentDidUpdate(prevProps, prevState) {
    const alert = this.props.node && this.props.node.alert ? this.props.node.alert : null;

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
