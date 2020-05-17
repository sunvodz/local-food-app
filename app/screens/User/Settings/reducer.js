import * as actionTypes from './actionTypes';
import { sharedActionTypes } from 'app/shared';

function settingsReducer(state, action) {
  switch (action.type) {
    case actionTypes.REQUEST_LANGUAGES:
    case actionTypes.RECEIVE_LANGUAGES:
      return Object.assign({}, state, {
        languages: action.languages,
        loading: action.loading,
      });
      break;

    case actionTypes.GET_PUSH_TOKEN:
      return Object.assign({}, state, {
        pushToken: action.pushToken,
      });
      break;

    default:
      return Object.assign({}, state, {});
      break;
  }
}

export default settingsReducer;
