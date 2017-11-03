import { API_URL } from 'react-native-dotenv';
import { api } from '../../shared';
import * as actionTypes from './actionTypes';

export function requestCurrentLocation() {
  return function(dispatch, getState) {
    dispatch(fetchingCurrentLocation());

    let location = navigator.geolocation.getCurrentPosition(function(location) {
      dispatch(receiveCurrentLocation(location));
    }, function (error) {
        console.error(error);
    });
  }
}

export function fetchingCurrentLocation() {
  return {
    type: actionTypes.FETCHING_CURRENT_LOCATION,
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

export function requestNodes() {
  return async function (dispatch, getState) {
    try {
      dispatch(fetchingNodes());
      let response = await api.call({url: '/api/v1/nodes'});
      let nodes = response.data;
      dispatch(receiveNodes(nodes));
    } catch (error) {
      console.error(error);
    }
  }
}

export function fetchingNodes() {
  return {
    type: actionTypes.FETCHING_NODES,
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
