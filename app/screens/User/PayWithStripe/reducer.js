import * as actionTypes from './actionTypes';

function stripeReducer(state, action) {
  switch (action.type) {
    case actionTypes.STRIPE_STARTED:
    case actionTypes.STRIPE_SUCCESS:
      return Object.assign({}, state, {
        paymentInProgress: action.paymentInProgress,
      });
      break;

    case actionTypes.CURRENCIES_IN_PROGRESS:
    case actionTypes.CURRENCIES_SUCCESS:
      return Object.assign({}, state, {
        currencies: action.currencies,
      });
      break;

    default:
      return Object.assign({}, state, {
          paymentInProgress: false,
      });
      break;
  }
}

export default stripeReducer;
