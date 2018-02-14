import * as actionTypes from './actionTypes';
import { sharedActionTypes } from 'app/shared';

function notificationsReducer(state, action) {
  switch (action.type) {
    default:
      return Object.assign({}, state, {});
      break;
  }
}

export default notificationsReducer;
