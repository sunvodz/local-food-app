import * as actionTypes from './actionTypes';

function nodeReducer(state, action) {
  switch (action.type) {
    case actionTypes.REQUEST_NODE:
    case actionTypes.RECEIVE_NODE:
      let filters = state.filters || {};
      filters.node = action.node ? action.node.id : null;

      return Object.assign({}, state, {
        node: action.node,
        filters: filters,
        loadingNode: action.loadingNode,
        loadingProducts: true,
        products: [],
      });
      break;

    case actionTypes.REQUEST_PRODUCTS:
      return Object.assign({}, state, {
        loadingProducts: action.loadingProducts,
      });
      break;

    case actionTypes.RECEIVE_PRODUCTS:
      let products = action.products;
      if (state.products) {
        products = state.products.concat(action.products)
      }

      return Object.assign({}, state, {
        products: products,
        loadingProducts: action.loadingProducts,
      });
      break;

    case actionTypes.RECEIVE_PRODUCTS_COUNT:
      return Object.assign({}, state, {
        productsCount: action.productsCount,
      });
      break;

    case actionTypes.REQUEST_NODE_DATES:
      return Object.assign({}, state, {
        loadingDates: action.loadingDates,
      });
      break;

    case actionTypes.RECEIVE_NODE_DATES:
      return Object.assign({}, state, {
        dates: action.dates,
        loadingDates: action.loadingDates,
      });
      break;

    case actionTypes.SET_DATE_FILTER:
      return Object.assign({}, state, {
        filters: Object.assign({}, state.filters, {
          date: action.date
        }),
        // Changing date triggers fetching of products
        loadingProducts: true,
        productsCount: null,
        products: [],
      });
      break;

    case actionTypes.RESET_NODE:
      return Object.assign({}, state, {
        node: null,
        products: [],
        dates: null,
        filters: {
          node: null,
        },
        loadingNode: false,
        loadingDates: false,
      });
      break;

    case actionTypes.FOLLOW_NODE_IN_PROGRESS:
      return Object.assign({}, state, {
        followNodeInProgress: true,
      });
      break;

    case actionTypes.FOLLOW_NODE_SUCCESS:
    case actionTypes.FOLLOW_NODE_FAILED:
      return Object.assign({}, state, {
        followNodeInProgress: false,
      });
      break;

    default:
      return Object.assign({}, state);
      break;
  }
}

export default nodeReducer;
