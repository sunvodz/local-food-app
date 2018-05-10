import * as actionTypes from './actionTypes';

function alertReducer(state, action) {
  switch (action.type) {
    case actionTypes.SHOW_ERROR:
      return Object.assign({}, state, {
        level: 'error',
        title: action.title,
        message: action.message
      });
      break;

    case actionTypes.SHOW_INFO:
      return Object.assign({}, state, {
        level: 'info',
        title: action.title,
        message: action.message
      });
      break;

    case actionTypes.SHOW_WARNING:
      return Object.assign({}, state, {
        level: 'warning',
        title: action.title,
        message: action.message
      });
      break;

    case actionTypes.SHOW_SUCCESS:
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
