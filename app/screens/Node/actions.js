import { api } from 'app/shared';
import * as actionTypes from './actionTypes';

export function fetchNode(nodeId) {
  return async function (dispatch, getState) {
    try {
      dispatch(requestNode());

      let response = await api.call({
        url: '/api/v1/nodes/' + nodeId
      });

      let node = response.data;

      dispatch(receiveNode(node));
    } catch (error) {
      console.error(error);
    }
  }
}

export function requestNode() {
  return {
    type: actionTypes.REQUEST_NODE,
    node: null,
    loading: true,
  }
}

export function receiveNode(node) {
  return {
    type: actionTypes.RECEIVE_NODE,
    node: node,
    loading: false,
  }
}
