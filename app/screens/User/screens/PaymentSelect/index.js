import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity, StyleSheet, Image, View, Text, ScrollView } from 'react-native';
import { FontAwesome as Icon } from '@expo/vector-icons';
import moment from 'moment';
import _ from 'lodash';

import { ContentWrapper, Card, Button, Link } from 'app/components';
import { sharedActions, trans } from 'app/shared';
import globalStyle from 'app/styles';

class PaymentSelect extends Component {

  payWithSwish = () => {
    const { navigation } = this.props
    
    navigation.navigate('payWithSwish')
  }
  payWithStripe = () => {
    const { navigation } = this.props
    
    navigation.navigate('payWithStripe')
  }



  render() {
    const { lang } = this.props;

    return (
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
        <Image style={styles.logo} source={require('../../../../../assets/images/logo-white.png')} />
        <View style={styles.wrapper}>
          <Text style={styles.infoHeader}>{trans('membership_info_header', lang)}</Text>
          <Text style={styles.infoText}>{trans('membership_info_part_1', lang)}</Text>
          <Text style={styles.infoText}>{trans('membership_info_part_2', lang)}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={this.payWithSwish}>
        <View style={{flex: 1}}>
          <Image source={require('../../../../../assets/images/Swish_Logo_Primary_RGB.png')} style={{flex:1, height: undefined, width: undefined}} resizeMode="contain"></Image>
        </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this.payWithStripe}>
        <Image source={require('../../../../../assets/images/Stripe_logo.png')} style={{flex:1, height: undefined, width: undefined}} resizeMode="contain"></Image>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  const { auth, settings } = state;

  return {
    // auth,
    // settings,
  }
}

export default connect(mapStateToProps)(PaymentSelect);

let styles = StyleSheet.create({
  scrollView: {
    backgroundColor: globalStyle.primaryColor,
    flex: 1,
  },
  container: {
    backgroundColor: globalStyle.primaryColor,
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  button: {
    backgroundColor: globalStyle.backgroundColor,
    width: '45%',
    height: 180,
    padding: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  logo: {
    height: 60,
    width: 70,
    margin: 15,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  infoHeader: {
    color: '#fff',
    fontFamily: 'montserrat-semibold',
    marginBottom: 15,
    textAlign: 'center',
  },
  infoText: {
    color: '#fff',
    fontFamily: 'montserrat-regular',
    marginBottom: 15,
    // width: '100%',
  },
  wrapper: {
    padding: 15,
  },
});
