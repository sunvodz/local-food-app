import trans from '../trans';

const standardUnits = [
  'kg', 'hg', 'g',
  'l', 'dl', 'cl', 'ml',
  'lb', 'oz', 'gr',
  'floz', 'pint', 'gallon',
];

const weightUnits = ['kg', 'hg', 'g'];

const unitHelper = {
  /**
   *
   * @param {*} priceUnit
   */
  isStandardUnit(priceUnit) {
    return standardUnits.indexOf(priceUnit) !== -1 ? true : false;
  },

  /**
   *
   * @param {*} priceUnit
   * @param {*} currency
   */
  getPriceUnit(priceUnit, currency) {
    if (this.isStandardUnit(unit)) {
      return `${currency} / ${priceUnit}`;
    } else {
      return currency;
    }
  },

  /**
   *
   * @param {*} packageUnit
   */
  isWeightUnit(packageUnit) {
    return weightUnits.indexOf(packageUnit) !== -1 ? true : false;
  },

  /**
   *
   * @param {*} product
   * @param {*} variant
   * @param {*} lang
   */
  getPackageUnit(product, variant, lang) {
    let packageUnit = null;
    let packageAmount = product.package_amount;

    if (variant) {
      packageAmount = variant.package_amount;
    }

    if (packageAmount && this.isWeightUnit(product.package_unit)) {
      packageUnit = `ca ${packageAmount} ${trans('unit_' + product.package_unit, lang)}`;
    } else if (packageAmount) {
      packageUnit = `${packageAmount} ${trans('unit_' + product.package_unit, lang)}`;
    }

    return packageUnit;
  }
}

export default unitHelper;
