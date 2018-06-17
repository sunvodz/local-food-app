import unitHelper from './unitHelper';

const priceHelper = {
  /**
   *
   * @param {*} product
   * @param {*} variant
   * @param {*} quantity
   */
  getPrice(product, variant) {
    let price = product.price;

    if (variant) {
      price = variant.price;
    }

    return price;
  },

  getCalculatedPrice(product, variant, quantity) {
    let price = this.getPrice(product, variant);
    let packageAmount = product.package_amount;

    if (variant) {
      packageAmount = variant.package_amount;
    }

    if (unitHelper.isStandardUnit(product.price_unit)) {
      price = price * packageAmount;
    }

    if (quantity !== null) {
      price = price * quantity;
    }

    return price;
  },

  /**
   *
   * @param {*} product
   * @param {*} variant
   * @param {*} quantity
   * @param {*} currency
   */
  getPriceFormatted(product, variant, currency, ignoreUnit = false) {
    let price = this.getPrice(product, variant);

    if (currency) {
      price += ` ${currency}`;
    }

    if (unitHelper.isWeightUnit(product.price_unit) && !ignoreUnit) {
      price += ` / ${product.price_unit}`;
    }

    return price;
  },

  /**
   *
   * @param {*} product
   * @param {*} variant
   * @param {*} quantity
   * @param {*} currency
   */
  getCalculatedPriceFormatted(product, variant, quantity, currency, ignoreUnit = false) {
    let price = this.getCalculatedPrice(product, variant, quantity);
    let priceCurrency = `${price} ${currency}`;

    if (unitHelper.isWeightUnit(product.price_unit) && !ignoreUnit) {
      priceCurrency = `${priceCurrency} / ${product.price_unit}`;
    }

    // Can't ignore the ≈ sign
    if (unitHelper.isWeightUnit(product.price_unit)) {
      priceCurrency = `≈ ${priceCurrency}`;
    }

    return priceCurrency;
  },
}

export default priceHelper;
