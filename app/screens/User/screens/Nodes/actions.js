import * as actionTypes from './actionTypes'
import { api } from 'app/shared';

/**
 * Async action - fetch orders.
 *
 * @return {function}
 */
export function fetchUserNodes() {
  return async function(dispatch, getState) {
    dispatch(requestUserNodes());

    let response = await api.call({
      url: '/api/v1/users/nodes'
    });

    let nodes = response.data;

    return dispatch(receiveUserNodes(nodes));
  }
}

export function requestUserNodes() {
  return {
    type: actionTypes.REQUEST_USER_NODES,
    nodes: null,
    loading: true,
  }
}

export function receiveUserNodes(nodes) {
  return {
    type: actionTypes.RECEIVE_USER_NODES,
    nodes: nodes,
    loading: false,
  }
}

export function removeNodeFromUser(nodeId) {
  return async function (dispatch, getState) {
    try {
      let response = await api.call({
        method: 'delete',
        url: `/api/v1/users/nodes/${nodeId}`
      });

      return dispatch(userNodeRemoved(nodeId));
    } catch (error) {}
  }
}

export function userNodeRemoved(nodeId) {
  return {
    type: actionTypes.USER_NODE_REMOVED,
    nodeId: nodeId,
  }
}