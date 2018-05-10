import * as actionTypes from './actionTypes';
import _ from 'lodash';

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

    case actionTypes.USER_NODE_REMOVED:
      let nodes = _.filter(state.nodes, (node) => {
        return node.id !== action.nodeId;
      });

      return Object.assign({}, state, {
        nodes: nodes,
      });
      break;

    default:
      return Object.assign({}, state, {});
      break;
  }
}

export default nodesReducer;
