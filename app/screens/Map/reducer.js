import * as actionTypes from './actionTypes';
import { sharedActionTypes } from '../../shared';

function mapReducer(state, action) {
  switch (action.type) {
    case actionTypes.FETCHING_CURRENT_LOCATION:
    case actionTypes.RECEIVE_CURRENT_LOCATION:
      return Object.assign({}, state, {
        location: action.location,
        loading: action.loading,
      });
      break;

    case actionTypes.FETCHING_NODES:
    case actionTypes.RECEIVE_NODES:
      return Object.assign({}, state, {
        nodes: action.nodes,
        loading: action.loading,
      });
      break;

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

export default mapReducer;
