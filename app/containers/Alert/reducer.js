import * as actionTypes from './actionTypes';
import {SWISH_SUCCESS} from 'app/types/swish'

function alertReducer(state, action) {
  switch (action.type) {
    // Errors
    case 'LOGIN_FAILED':
    case 'CREATE_ACCOUNT_FAILED':
    case 'UPDATING_CART_FAILED':
    case 'PAYMENT_FAILED':
    case 'ADD_TO_CART_FAILED':
    case 'CREATE_ORDER_FAILED':
    case 'RECEIVE_NODES_FAILED':
    case 'RECEIVE_USER_NODES_FAILED':
    case 'RECEIVE_PRODUCTS_FAILED':
    case 'RECEIVE_NODE_DATES_FAILED':
    case 'RECEIVE_NOTIFICATIONS_FAILED':
    case 'RECEIVE_ORDERS_FAILED':
    case 'RESEND_EMAIL_FAILED':
      return Object.assign({}, state, {
        level: 'error',
        title: action.title,
        message: action.message
      });
      break;

    case SWISH_SUCCESS:
        return Object.assign({}, state, {
          level: 'success',
          title: action.title,
          message: action.message
        });

    // Success
    // PAYMENT_SUCCESS doesn't need an alert since a new view is displayed instead
    case 'ADD_TO_CART_SUCCESS':
    case 'CREATE_ORDER_SUCCESS':
    case 'RESEND_EMAIL_SUCCESS':
    case 'CREATE_ACCOUNT_SUCCESS':
      return Object.assign({}, state, {
        level: 'success',
        title: action.title,
        message: action.message
      });
      break;

    case 'NOTIFICATION_RECEIVED':
      return Object.assign({}, state, {
        level: 'info',
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
