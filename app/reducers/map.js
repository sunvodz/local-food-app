import * as actionTypes from 'app/screens/Map/actionTypes';
import { sharedActionTypes } from 'app/shared';

function mapReducer(state, action) {
  switch (action.type) {
    case actionTypes.REQUEST_CURRENT_LOCATION:
    case actionTypes.RECEIVE_CURRENT_LOCATION:
    case actionTypes.RECEIVE_DEFAULT_LOCATION:
      return Object.assign({}, state, {
        location: action.location,
      });
      break;

    case actionTypes.REQUEST_NODES:
    case actionTypes.REFRESH_NODES:
    case actionTypes.RECEIVE_NODES:
    case actionTypes.RECEIVE_NODES_FAILED:
      return Object.assign({}, state, {
        nodes: action.nodes,
        loading: action.loading,
        refresh: action.refresh,
      });
      break;

    default:
      return Object.assign({}, state, {});
      break;
  }
}

export default mapReducer;
