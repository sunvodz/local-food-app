import * as actionTypes from './actionTypes';
import { sharedActionTypes } from '../../shared';

function nodeReducer(state, action) {
  switch (action.type) {
    case sharedActionTypes.ALERT:
    case sharedActionTypes.RESET_ALERT:
      return Object.assign({}, state, {
        alert: action.alert,
      });
      break;

    default:
      return Object.assign({}, state, {});
      break;
  }
}

export default nodeReducer;
