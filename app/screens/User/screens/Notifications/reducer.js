import * as actionTypes from './actionTypes';
import { sharedActionTypes } from 'app/shared';

function notificationsReducer(state, action) {
  switch (action.type) {
    case actionTypes.REQUEST_NOTIFICATIONS:
    case actionTypes.RECEIVE_NOTIFICATIONS:
    case actionTypes.RECEIVE_NOTIFICATIONS_FAILED:
      return Object.assign({}, state, {
        notifications: action.notifications,
        loading: action.loading,
      });
      break;

    default:
      return Object.assign({}, state, {});
      break;
  }
}

export default notificationsReducer;
