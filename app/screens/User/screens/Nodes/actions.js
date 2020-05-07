import * as actionTypes from './actionTypes'
import { api, sharedActions, trans } from 'app/shared';
import _ from 'lodash';

export function fetchUserNodes() {
  return async function(dispatch, getState) {
    try {
      dispatch(requestUserNodes());

      let response = await api.call({
        url: '/api/v1/user/nodes'
      });

      let data = await response.json();
      let nodes = _.sortBy(data, node => {
        return node.name;
      });

      dispatch(receiveUserNodes(nodes));
    } catch(error) {
      sharedActions.checkMaintenanceMode(dispatch, error);

      dispatch(receiveUserNodesFailed(error));
    }
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

export function receiveUserNodesFailed(error) {
  return {
    type: actionTypes.RECEIVE_USER_NODES_FAILED,
    nodes: null,
    loading: false,
    title: trans('Nodes'),
    message: trans('Failed loading nodes'),
  }
}

export function removeNodeFromUser(nodeId) {
  return async function (dispatch, getState) {
    try {
      let response = await api.call({
        method: 'post',
        url: `/api/v1/user/nodes/${nodeId}`
      });

      dispatch(userNodeRemoved(nodeId));
    } catch (error) {}
  }
}

export function userNodeRemoved(nodeId) {
  return {
    type: actionTypes.USER_NODE_REMOVED,
    nodeId: nodeId,
  }
}