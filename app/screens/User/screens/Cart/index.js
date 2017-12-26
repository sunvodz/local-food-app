import React from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';

import AuthScreen from 'app/screens/Auth';

import { ContentWrapper, Header } from 'app/components';

class Cart extends React.Component {
  render() {
    let content = null;

    if (this.props.auth.loading) {
      return <Text>Loading...</Text>;
    }

    if (!this.props.auth.user) {
      content = <AuthScreen {...this.props} />;
    }

    if (this.props.auth.user) {
      content = <Text>Cart!</Text>;
    }

    return (
      <View style={{flex: 1}}>
        <Header label="Cart" />
        <ContentWrapper>
          {content}
        </ContentWrapper>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { auth, cart } = state;

  return {
    auth,
    cart,
  };
}


export default connect(mapStateToProps)(Cart);
