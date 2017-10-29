import * as actionTypes from './actionTypes';

export function requestNodes() {
  return (dispatch, getState) => {

  }
}

export function receiveNodes(data) {
  return {
    type: actionTypes.RECEIVE_NODES,
    data: data,
  }
}
