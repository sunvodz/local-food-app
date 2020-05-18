import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity, StyleSheet, Image, View, Text, ScrollView, Dimensions } from 'react-native';
import _ from 'lodash';

import { trans } from 'app/shared';
import globalStyle from 'app/styles';

class PaymentSelect extends Component {

  payWithSwish = () => {
    const { navigation, route } = this.props
    navigation.navigate('PayWithSwish', {
      lang: route.params.lang
    });
  }

  payWithStripe = () => {
    const { navigation, route } = this.props
    navigation.navigate('PayWithStripe', {
      lang: route.params.lang
    });
  }

  render() {
    const lang = this.props.route.params.lang;

    return (
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
        <Image style={styles.logo} source={require('../../../../assets/images/logo-white.png')} />
        <View style={styles.wrapper}>
          <Text style={styles.infoHeader}>{trans('A desire to make food local again', lang)}</Text>
          <Text style={styles.infoText}>{trans('Local Food Nodes is built on a gift based enonomy. By supporting with a donation, free of choice, you co-finance efforts to make the food more local again.', lang)}</Text>
          <Text style={styles.infoText}>{trans('Your donation will be invested into development of the platform Local Food Nodes. Any surplus will be invested in projects that help develop local food. No money will hit the pockets of private interests. Not now, not ever.', lang)}</Text>
        </View>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.button} onPress={this.payWithSwish}>
            <Image source={require('../../../../assets/images/swish.png')} style={styles.image} resizeMode="contain"></Image>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonLast]} onPress={this.payWithStripe}>
            <Image source={require('../../../../assets/images/visamastercard.png')} style={styles.image} resizeMode="contain"></Image>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(PaymentSelect);

const dimensions = Dimensions.get('window');
// const imageHeight = Math.round(dimensions.width * 9 / 16);
const imageWidth = (dimensions.width / 2) - 30; // (screen width / 2) - wrapper margin

let styles = StyleSheet.create({
  scrollView: {
    backgroundColor: globalStyle.mainPrimaryColor,
    flex: 1,
  },
  container: {
    backgroundColor: globalStyle.mainPrimaryColor,
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  buttonWrapper: {
    flex: 1,
    flexDirection: 'row',
    margin: 15,
  },
  button: {
    height: 30,
    marginRight: 15,
  },
  buttonLast: {
    marginRight: 0,
  },
  image: {
    height: 30,
    width: imageWidth,
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
  },
  wrapper: {
    padding: 15,
  },
});
