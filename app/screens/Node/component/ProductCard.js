import React from 'react';
import { View, Text, Image, ImageBackground, Dimensions } from 'react-native';
import striptags from 'striptags';
import HTMLView from 'react-native-htmlview';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome';

import OrderForm from './OrderForm';

export default class ProductCard extends React.Component {
  constructor(props) {
    super(props);

    let variant = null;
    if (this.props.product.product_variants_relationship.length > 0) {
      variant = this.props.product.product_variants_relationship[0];
    }

    this.state = {
      variant: variant,
    };
  }

  onSelectVariant(index) {
    const { product } = this.props;

    let variant = product.product_variants_relationship[index];

    this.setState({variant: variant});
  }

  sanitizeInfo(info) {
    info = striptags(info);
    info = info.replace(/(\r\n|\n|\r)/gm, '');

    return info;
  }

  addToCart(data) {
    data.product_id = this.props.product.id;
    data.variant_id = this.state.variant ? this.state.variant.id : null;

    this.props.addToCart(data);
  }

  navigateToSignIn() {
    this.props.navigateToSignIn();
  }

  render() {
    const { product } = this.props;
    const producer = product.producer_relationship;

    let imageProps = {
      source: require('../../../../assets/images/product-placeholder.jpg'), // Product fallback image
      style: styles.image,
    }

    if (this.props.image) {
      imageProps.source = {uri: this.props.image};
    }

    let swipe = (
      <View style={{flex: 1}}>
        <Image {...imageProps} />
      </View>
    );

    let variantHeader = null;
    if (product.product_variants_relationship.length > 0) {
      variantHeader = <Text> - {this.state.variant.name} ({this.state.variant.package_amount} {product.package_unit})</Text>;

      let variants = product.product_variants_relationship.map(variant => {
        return (
          <View style={{flex: 1}} key={variant.id}>
            <ImageBackground {...imageProps} style={styles.swiperSlide}>
              <Icon name='clone' style={{position: 'absolute', top: 15, right: 15, color: '#fff', fontSize: 20}} />
            </ImageBackground>
          </View>
        );
      });

      swipe = (
        <Swiper style={styles.swiper} height={Dimensions.get('window').width / 1.5} loop={false} dotColor={'#999'} activeDotColor='#fff' onIndexChanged={this.onSelectVariant.bind(this)}>
          {variants}
        </Swiper>
      );
    }

    return (
      <View>
        <Text numberOfLines={1} style={styles.product}>{product.name} {variantHeader}</Text>
        <Text numberOfLines={1} style={styles.producer}>{product.producer_relationship.name}</Text>
        {swipe}
        <OrderForm auth={this.props.auth} product={product} variant={this.state.variant} addToCart={this.addToCart.bind(this)} navigateToSignIn={this.navigateToSignIn.bind(this)}/>
        <Text style={styles.info}>{product.infoRaw}</Text>
      </View>
    );
  }
}

const styles = {
  swiper: {
    flex: 1,
  },
  swiperSlide: {
    flex: 1,
  },
  product: {
    color: '#333',
    fontFamily: 'montserrat-semibold',
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 0,
  },
  producer: {
    color: '#666',
    fontFamily: 'montserrat-regular',
    paddingHorizontal: 15,
    paddingTop: 0,
    paddingBottom: 15,
  },
  image: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width / 2,
  },
  info: {
    fontFamily: 'montserrat-regular',
    padding: 15,
  }
};
