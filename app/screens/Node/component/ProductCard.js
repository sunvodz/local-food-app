import React from 'react';
import { View, Text, Image, ImageBackground, Dimensions } from 'react-native';
import striptags from 'striptags';
import Swiper from 'react-native-swiper';
import { FontAwesome as Icon } from '@expo/vector-icons';

import { trans } from 'app/shared';
import OrderForm from './OrderForm';
import globalStyle from 'app/styles';

export default class ProductCard extends React.Component {
  constructor(props) {
    super(props);

    let variant = null;
    if (this.props.product.variants.length > 0) {
      variant = this.props.product.variants[0];
    }

    this.state = {
      variant: variant,
      readMore: false,
    };
  }

  onSelectVariant(index) {
    const { product } = this.props;

    let variant = product.variants[index];

    this.setState({variant: variant});
  }

  sanitizeInfo(info) {
    info = striptags(info);
    info = info.replace(/(\r\n|\n|\r)/gm, '');

    return info;
  }

  onQuantityChange(data) {
    data.product_id = this.props.product.id;
    data.variant_id = this.state.variant ? this.state.variant.id : null;

    data.product = this.props.product;
    data.variant = this.state.variant ? this.state.variant : null;
    data.producer = this.props.product.producer;

    this.props.onQuantityChange(data);
  }

  toggleReadMore() {
    this.setState({readMore: !this.state.readMore});
  }

  render() {
    const { product } = this.props;

    let productInfo = product.infoRaw;
    let readMore = null;
    if (productInfo.length > 100 && !this.state.readMore) {
      productInfo = productInfo.substr(0, 140) + '...';
      readMore = <Text style={styles.readMore} onPress={this.toggleReadMore.bind(this)}>{trans('Read more', this.props.lang)}</Text>;
    } else if (productInfo.length > 100 && this.state.readMore) {
      readMore = <Text style={styles.readMore} onPress={this.toggleReadMore.bind(this)}>{trans('Read less', this.props.lang)}</Text>;
    }

    let imageProps = {
      source: require('../../../../assets/images/product-placeholder.jpg'), // Product fallback image
      style: styles.image,
    }

    if (this.props.image) {
      imageProps.source = {uri: this.props.image};
    }

    let csaIcon = null;
    if (product.stock_type === 'csa') {
      csaIcon = (
        <View style={styles.csaIcon}>
          <Text style={styles.csaIconText}>CSA</Text>
        </View>
      );
    }

    let swipe = (
      <View style={{flex: 1}}>
        <Image {...imageProps} />
        {csaIcon}
      </View>
    );

    if (product.variants.length > 0) {
      let variantIcon = product.variants.length > 1 ? <Icon name='clone' style={styles.variantIcon} /> : null;
      let variants = product.variants.map(variant => {
        return (
          <View style={{flex: 1}} key={variant.id}>
            <ImageBackground {...imageProps} style={styles.swiperSlide}>
              {csaIcon}
              {variantIcon}
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
        <View style={styles.productCard}>
          <View>
            <Text numberOfLines={2} style={styles.productTitle}>{product.name}</Text>
            <Text numberOfLines={1} style={styles.producerTitle}>{product.producer.name}</Text>
          </View>
          {swipe}
          <OrderForm auth={this.props.auth} product={product} variant={this.state.variant} onQuantityChange={this.onQuantityChange.bind(this)} lang={this.props.lang} />
          <Text style={styles.info}>{productInfo}</Text>
          {readMore}
        </View>
      </View>
    );
  }
}

let styles = {
  swiperSlide: {
    flex: 1,
  },
  product: {
    borderBottomWidth: 2,
    borderBottomColor: globalStyle.backgroundColor,
  },
  productCard: {
    backgroundColor: '#fff',
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
    paddingTop: 2,
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
    lineHeight: 20,
    padding: 15,
  },
  readMore: {
    fontFamily: 'montserrat-regular',
    color: '#999',
    marginLeft: 15,
    marginBottom: 15,
  },
  variantIcon: {
    bottom: 20,
    color: '#fff',
    fontSize: 20,
    position: 'absolute',
    right: 20,
  },
  csaIcon: {
    backgroundColor: '#bf360c',
    borderRadius: 20,
    left: 10,
    overflow: 'hidden',
    paddingLeft: 10,
    paddingRight: 10,
    paddingVertical: 5,
    position: 'absolute',
    top: 10,
  },
  csaIconText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'montserrat-semibold',
  },
};
