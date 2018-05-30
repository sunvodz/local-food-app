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
        loadingNodes: action.loadingNodes,
        loadingProducts: true,
      });
      break;

    case actionTypes.REQUEST_PRODUCTS:
    case actionTypes.RECEIVE_PRODUCTS:
      return Object.assign({}, state, {
        products: action.products,
        loadingProducts: action.loadingProducts,
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
        })
      });
      break;

    case actionTypes.RESET_NODE:
      return Object.assign({}, state, {
        node: null,
        products: null,
        dates: null,
        filters: {
          node: null,
        },
        loadingNodes: false,
        loadingDates: false,
      });
      break;

    default:
      return Object.assign({}, state);
      break;
  }
}

export default nodeReducer;
