import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, Text, View } from 'react-native';
import { Button } from 'app/components';
import { trans } from 'app/shared';
import globalStyle from 'app/styles';
import { FontAwesome5 as Icon } from '@expo/vector-icons';
import * as actions from './actions';

class DonateNothing extends Component {
  componentDidUpdate() {
    if (this.props.auth.paymentSuccess) {
      this.props.navigation.navigate('Settings');
    }
  }

  onDonateNothing() {
    this.props.dispatch(actions.donateNothing(this.props.auth.user.id));
  }

  render() {
    const { auth } = this.props;
    const lang = this.props.route.params.lang;

    let button = <Button style={styles.button} onPress={this.onDonateNothing.bind(this)} title={trans('Donate nothing', lang)} />;
    if (auth.paymentInProgress) {
      button = <ActivityIndicator color="#fff" />;
    }

    return (
      <View style={styles.container}>
        <Icon style={styles.icon} name='sad-tear' />
        <Text style={styles.text}>{trans('Local Food Nodes is built on a gift based enonomy. By supporting with a donation, free of choice, you co-finance efforts to make the food more local again.', lang)}</Text>
        {button}
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { auth } = state;

  return {
    auth,
  }
}

export default connect(mapStateToProps)(DonateNothing);

let styles = {
  container: {
    alignItems: 'center',
    backgroundColor: globalStyle.mainPrimaryColor,
    flex: 1,
    padding: 15,
  },
  text: {
    color: '#fff',
    fontFamily: 'montserrat-regular',
    lineHeight: 20,
    marginBottom: 15,
  },
  icon: {
    color: '#fff',
    fontSize: 50,
    marginBottom: 30,
    marginTop: 30,
  },
  button: {
    button: {
      marginTop: 15,
    }
  },
};
