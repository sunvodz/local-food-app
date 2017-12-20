import React from 'react';
import { connect } from 'react-redux';
import { Text, View, Button } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';

import { TextInput, ContentWrapper, Card } from '../../components';

import * as actions from './actions';

class NodeScreen extends React.Component {
  render() {
    let content = null;

    return (
      <View style={{flex: 1}}>
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
