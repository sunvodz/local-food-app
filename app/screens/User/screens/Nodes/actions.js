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
