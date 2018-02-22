import * as actionTypes from './actionTypes';
import { sharedActionTypes } from 'app/shared';

function nodesReducer(state, action) {
  switch (action.type) {
    case sharedActionTypes.SERVER_ERROR:
      return Object.assign({}, state, {
        serverError: true,
      });
      break;

    case actionTypes.REQUEST_USER_NODES:
    case actionTypes.RECEIVE_USER_NODES:
      return Object.assign({}, state, {
        nodes: action.nodes,
        loading: action.loading,
        refreshing: action.refreshing || false,
      });
      break;

    default:
      return Object.assign({}, state, {});
      break;
  }
}

export default nodesReducer;
