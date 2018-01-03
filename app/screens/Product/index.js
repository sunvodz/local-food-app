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
    this.state = {
      modal: {
        visible: false
      }
    }
  }

  componentDidMount() {
    const product = this.props.navigation.state.params;

    this.props.dispatch(actions.fetchProduct(product.id));
  }

  toggleModal(visible) {
    let state = this.state;
    state.modal.visible = visible;
    this.setState(state);
  }

  render() {
    if (!this.props.product.product) {
      return <Loader />;
    }

    return (
      <View style={{flex: 1}}>
        <ContentWrapper>
          <Text>{ent.decode(striptags(this.props.product.product.info))}</Text>
          <Button onPress={this.toggleModal.bind(this, true)} title="Buy" color="#bc3b1f" />
        </ContentWrapper>
        <OrderModal visible={this.state.modal.visible} onRequestClose={this.toggleModal.bind(this, false)} />
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
