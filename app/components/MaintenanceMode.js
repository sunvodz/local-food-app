import React from 'react';
import { View, Text, Image } from 'react-native';
import globalStyle from 'app/styles';
import Button from './Button';
import { sharedActions } from 'app/shared';

export default class Badge extends React.Component {
  check() {
    this.props.dispatch(sharedActions.checkIfBackendIsBack());
  }

  render() {
    return (
      <View style={styles.view}>
        <Image style={styles.logo} source={require('../../assets/images/logo-white.png')} />
        <Text style={styles.header}>Sorry, we're down...</Text>
        <Text style={styles.text}>We are doing some maintenance at the moment but we will be up soon. Please come back later!</Text>
        <Button style={styles.button} onPress={this.check.bind(this)} title='Try to connect' />
      </View>
    );
  }
}

let styles = {
  logo: {
    height: 60,
    width: 70,
    margin: 15,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  view: {
    alignItems: 'center',
    backgroundColor: globalStyle.primaryColor,
    flex: 1,
    justifyContent: 'center',
    padding: 15,
  },
  header: {
    color: '#fff',
    fontFamily: 'montserrat-semibold',
    marginBottom: 15,
  },
  text: {
    color: '#fff',
    fontFamily: 'montserrat-regular',
    lineHeight: 20,
    marginBottom: 30,
  },
};
