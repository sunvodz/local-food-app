import * as actionTypes from './actionTypes';
import { sharedActionTypes } from 'app/shared';

function settingsReducer(state, action) {
  switch (action.type) {
    default:
      return Object.assign({}, state, {});
      break;
  }
}

export default settingsReducer;
