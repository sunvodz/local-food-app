import * as actionTypes from './actionTypes';

function alertReducer(state, action) {
  switch (action.type) {
    // Errors
    case 'LOGIN_FAILED':
    case 'CREATE_ACCOUNT_FAILED':
    case 'UPDATING_CART_FAILED':
    case 'ADD_TO_CART_FAILED':
    case 'REMOVE_CART_ITEM_FAILED':
    case 'CREATE_ORDER_FAILED':
    case 'RECEIVE_NODES_FAILED':
    case 'RECEIVE_USER_NODES_FAILED':
    case 'RECEIVE_PRODUCTS_FAILED':
    case 'RECEIVE_NODE_DATES_FAILED':
    case 'RECEIVE_ORDERS_FAILED':
    case 'RESEND_EMAIL_FAILED':
    case 'STRIPE_FAILED':
    case 'STRIPE_DECLINED':
    case 'SWISH_FAILED':
    case 'SWISH_DECLINED':
    case 'DONATE_NOTHING_FAILED':
    case 'FOLLOW_NODE_FAILED':
    case 'REGISTER_PUSH_NOTIFICATIONS_FAILED':
    case 'ENABLING_LOCATION_SERVICES_FAILED':
      return Object.assign({}, state, {
        level: 'error',
        title: action.title,
        message: action.message
      });
      break;

    // Success
    case 'ADD_TO_CART_SUCCESS':
    case 'CREATE_ORDER_SUCCESS':
    case 'RESEND_EMAIL_SUCCESS':
    case 'CREATE_ACCOUNT_SUCCESS':
    case 'NOTIFICATION_RECEIVED':
    case 'REGISTER_PUSH_NOTIFICATIONS_SUCCESS':
    case 'UNREGISTER_PUSH_NOTIFICATIONS_SUCCESS':
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
