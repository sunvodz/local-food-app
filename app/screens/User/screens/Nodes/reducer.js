import * as actionTypes from './actionTypes';

function nodesReducer(state, action) {
  switch (action.type) {
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
