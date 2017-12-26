import React from 'react';
import { connect } from 'react-redux';
import { Text, View, Button } from 'react-native';
import striptags from 'striptags';
import ent from 'ent';

import { Loader, TextInput, ContentWrapper, Card } from 'app/components';

import * as actions from './actions';

class Product extends React.Component {
  componentDidMount() {
    const product = this.props.navigation.state.params;

    this.props.dispatch(actions.fetchProduct(product.id));
  }

  render() {
    if (!this.props.product.product) {
      return <Loader />;
    }

    return (
      <View style={{flex: 1}}>
        <ContentWrapper>
          <Text>{ent.decode(striptags(this.props.product.product.info))}</Text>
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

export default connect(mapStateToProps)(Product);
