import React from 'react';
import { connect } from 'react-redux';
import { Text, View, Button } from 'react-native';

import { TextInput, ContentWrapper, Card } from 'app/components';

import * as actions from './actions';

class ProductScreen extends React.Component {
  render() {
    let content = null;

    return (
      <View style={{flex: 1}}>
        <ContentWrapper>
          <Text>Product!</Text>
        </ContentWrapper>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { auth, product } = state;

  return {
    auth,
    product,
  }
}

export default connect(mapStateToProps)(ProductScreen);
