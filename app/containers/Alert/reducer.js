import * as actionTypes from './actionTypes';

function alertReducer(state, action) {
  switch (action.type) {
    // Errors
    case 'LOGIN_FAILED':
    case 'CREATE_ACCOUNT_FAILED':
    case 'UPDATING_CART_FAILED':
    case 'PAYMENT_FAILED':
    case 'ADD_TO_CART_FAILED':
      return Object.assign({}, state, {
        level: 'error',
        title: action.title,
        message: action.message
      });
      break;

    // Success
    case 'PAYMENT_SUCCESS':
    case 'ADD_TO_CART_SUCCESS':
      return Object.assign({}, state, {
        level: 'success',
        title: action.title,
        message: action.message
      });
      break;

    case actionTypes.RESET_ALERT:
      return Object.assign({}, state, {
        level: null,
        title: null,
        message: null
      });
      break;

    default:
      return Object.assign({}, state, {});
      break;
  }
}

export default alertReducer;
