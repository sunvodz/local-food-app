import _ from 'lodash';

const styleMerger = {
  merge(styles, propStyles) {
    let mergeStyles = {};

    if (_.isArray(propStyles)) {
      propStyles = Object.assign(...propStyles);
    }

    Object.keys(styles).map(key => {
      mergeStyles[key] = styles[key];

      if (propStyles && propStyles[key]) {
        mergeStyles[key] = Object.assign({}, styles[key], propStyles[key]);
      }
    });

    return mergeStyles;
  }
}

export default styleMerger;
