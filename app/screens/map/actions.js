import * as actionTypes from './actionTypes'

export function requestNodes() {
  return (dispatch, getState) => {
    console.log('');
  }
}

export function receiveNodes(data) {
  console.log('reeive noced');
  return {
    type: actionTypes.RECEIVE_NODES,
    data: data,
  }
}
