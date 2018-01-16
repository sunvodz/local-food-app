import React from 'react';
import { connect } from 'react-redux';
import { Text, View, Modal } from 'react-native';
import striptags from 'striptags';
import ent from 'ent';

import { Loader, TextInput, ContentWrapper, Card, Button } from 'app/components';
import OrderModal from './components/OrderModal';
import * as actions from './actions';

class Product extends React.Component {
  constructor(props) {
    super(props);

    const { product, node, dates, filters } = props.navigation.state.params;

    this.state = {
      product: product,
      node: node,
      dates: dates,
      filters: filters,
      modal: {
        isVisible: false
      }
    }
  }

  toggleModal(visible) {
    let state = this.state;
    state.modal.isVisible = visible;
    this.setState(state);
  }

  render() {
    if (!this.state.product) {
      return <Loader />;
    }

    return (
      <View style={{flex: 1}}>
        <ContentWrapper>
          <Text>{ent.decode(striptags(this.state.product.info))}</Text>
          <Button onPress={this.toggleModal.bind(this, true)} title="Buy" color="#bc3b1f" />
        </ContentWrapper>
        <OrderModal {...this.state} isVisible={this.state.modal.isVisible} onClose={this.toggleModal.bind(this, false)} />
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
