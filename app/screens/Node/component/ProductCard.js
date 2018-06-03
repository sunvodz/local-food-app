import React from 'react';
import { View, Text, TouchableHighlight, Image, ImageBackground, Dimensions } from 'react-native';
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
      readMore: false,
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

  toggleReadMore() {
    this.setState({readMore: !this.state.readMore});
  }

  render() {
    const { product } = this.props;
    const producer = product.producer_relationship;

    let productInfo = product.infoRaw;
    let readMore = null;
    if (productInfo.length > 100 && !this.state.readMore) {
      productInfo = productInfo.substr(0, 140) + '...';
      readMore = <Text style={styles.readMore} onPress={this.toggleReadMore.bind(this)}>Read more</Text>;
    } else if (productInfo.length > 100 && this.state.readMore) {
      readMore = <Text style={styles.readMore} onPress={this.toggleReadMore.bind(this)}>Read less</Text>;
    }

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
      variantHeader = <Text>{this.state.variant.name} ({this.state.variant.package_amount} {product.package_unit})</Text>;

      let variants = product.product_variants_relationship.map(variant => {
        return (
          <View style={{flex: 1}} key={variant.id}>
            <ImageBackground {...imageProps} style={styles.swiperSlide}>
              <Icon name='clone' style={{position: 'absolute', bottom: 20, right: 20, color: '#fff', fontSize: 20}} />
            </ImageBackground>
          </View>
        );
      });

      swipe = (
        <Swiper height={Dimensions.get('window').width / 1.5} loop={false} dotColor={'#e4e4e0'} activeDotColor='#fff' onIndexChanged={this.onSelectVariant.bind(this)}>
          {variants}
        </Swiper>
      );
    }

    return (
      <View style={styles.product}>
        <View>
          <Text numberOfLines={1} style={styles.productTitle}>{product.name}</Text>
          <Text numberOfLines={1} style={styles.producerTitle}>{product.producer_relationship.name}</Text>
        </View>
        {swipe}
        <OrderForm auth={this.props.auth} product={product} variant={this.state.variant} addToCart={this.addToCart.bind(this)} navigateToSignIn={this.navigateToSignIn.bind(this)}/>
        <Text style={styles.info}>{productInfo}</Text>
        {readMore}
      </View>
    );
  }
}

const styles = {
  swiperSlide: {
    flex: 1,
  },
  product: {
    paddingBottom: 15,
    borderBottomWidth: 15,
    borderColor: '#f4f4f0',
  },
  productTitle: {
    color: '#333',
    fontFamily: 'montserrat-semibold',
    fontSize: 16,
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 0,
  },
  producerTitle: {
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
  },
  readMore: {
    fontFamily: 'montserrat-regular',
    color: '#999',
    marginLeft: 15,
    marginBottom: 15,
  }
};
