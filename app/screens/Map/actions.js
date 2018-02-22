import { API_URL } from 'react-native-dotenv';
import { api } from 'app/shared';
import * as actionTypes from './actionTypes';
import { sharedActions } from 'app/shared';

export function fetchCurrentLocation() {
  return function(dispatch, getState) {
    dispatch(requestCurrentLocation());

    let location = navigator.geolocation.getCurrentPosition(function(location) {
      dispatch(receiveCurrentLocation(location));
    }, function (error) {
        console.error(error);
    });
  }
}

export function requestCurrentLocation() {
  return {
    type: actionTypes.REQUEST_CURRENT_LOCATION,
    location: null,
    loading: true,
  }
}

export function receiveCurrentLocation(location) {
  return {
    type: actionTypes.RECEIVE_CURRENT_LOCATION,
    location: location,
    loading: false,
  }
}

export function fetchNodes() {
  return async function (dispatch, getState) {
    try {
      dispatch(requestNodes());

      let response = await api.call({
        url: '/api/v1/nodes',
      });

      let nodes = response.data;

      dispatch(receiveNodes(nodes));
    } catch (error) {
      // GLOBAL ERROR
      // console.error('error in map!!!', error);
      dispatch(sharedActions.serverError(error));
    }
  }
}

export function requestNodes() {
  return {
    type: actionTypes.REQUEST_NODES,
    loading: true,
    nodes: null,
  }
}

export function receiveNodes(nodes) {
  return {
    type: actionTypes.RECEIVE_NODES,
    loading: false,
    nodes: nodes,
  }
}
