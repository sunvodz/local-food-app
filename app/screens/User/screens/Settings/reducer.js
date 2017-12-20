import * as actionTypes from './actionTypes';
import { sharedActionTypes } from 'app/shared';

function settingsReducer(state, action) {
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

export default settingsReducer;
