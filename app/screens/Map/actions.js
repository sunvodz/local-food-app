import { API_URL } from 'react-native-dotenv';
import { api, sharedActions } from 'app/shared';
import * as actionTypes from './actionTypes';

export function fetchCurrentLocation() {
  return async function(dispatch, getState) {
    try {
      dispatch(requestCurrentLocation());
      let location = await sharedActions.getLocationAsync();
      dispatch(receiveCurrentLocation(location));
    } catch (error) {
      dispatch(receiveDefaultLocation({
        coords: {
          accuracy: 5,
          altitude: 0,
          altitudeAccuracy: -1,
          heading: -1,
          latitude: 56,
          longitude: 13.3,
          speed: -1,
        }
      }));
    }
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

export function receiveDefaultLocation(location) {
  return {
    type: actionTypes.RECEIVE_DEFAULT_LOCATION,
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
    } catch (exception) {
      dispatch({
        type: actionTypes.SHOW_ERROR,
        title: 'Could not load nodes',
        message: exception.error
      });
      dispatch(receiveNodes(null)); // No nodes will show server error warning
    }
  }
}

export function requestNodes() {
  return {
    type: actionTypes.REQUEST_NODES,
    loading: true,
    refresh: false,
    nodes: null,
  }
}

export function receiveNodes(nodes) {
  return {
    type: actionTypes.RECEIVE_NODES,
    loading: false,
    refresh: false,
    nodes: nodes,
  }
}

export function refreshNodes() {
  return async function (dispatch, getState) {
    try {
      dispatch(refreshingNodes());

      let response = await api.call({
        url: '/api/v1/nodes',
      });

      let nodes = response.data;

      dispatch(receiveNodes(nodes));
    } catch (exception) {
      dispatch({
        type: actionTypes.SHOW_ERROR,
        title: 'Could not refresh nodes',
        message: exception.error
      });
      dispatch(receiveNodes(null)); // No nodes will show server error warning
    }
  }
}

export function refreshingNodes() {
  return {
    type: actionTypes.REFRESH_NODES,
    loading: false,
    refresh: true,
    nodes: null,
  }
}
