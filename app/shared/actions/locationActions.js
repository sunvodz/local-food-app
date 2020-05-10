import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import trans from './../trans';
import * as sharedActionTypes from './../sharedActionTypes';

export function getLocationPermission() {
  return async function(dispatch, getState) {
    try {
      const locationPermission = await Permissions.getAsync(Permissions.LOCATION);

      if (locationPermission.status === 'granted') {
        dispatch(locationPermissionGranted());
      } else {
        throw new Error(trans('Location permission not granted'));
      }
    } catch(error) {
      dispatch(locationPermissionDenied());
    }
  }
}

export function locationPermissionGranted() {
  return {
    type: sharedActionTypes.LOCATION_PERMISSION_GRANTED,
    locationPermission: 'granted',
  }
}

export function locationPermissionDenied() {
  return {
    type: sharedActionTypes.LOCATION_PERMISSION_DENIED,
    locationPermission: 'denied',
  }
}

export function askLocationPermission(showAlert) {
  return async function(dispatch, getState) {
    try {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);

      if (status === 'granted') {
        let location =  await Location.getCurrentPositionAsync({enableHighAccuracy: true});
        dispatch(receiveCurrentLocation(location));
        dispatch(locationPermissionGranted());
      } else {
        throw new Error(trans('Location permission not granted'));
      }
    } catch(error) {
      dispatch(locationPermissionDenied());

      if (showAlert) {
        dispatch(failedEnablingLocationServices());
      }
    }
  }
}

export function receiveCurrentLocation(location) {
  return {
    type: sharedActionTypes.RECEIVE_CURRENT_LOCATION,
    location: location,
    loading: false,
  }
}

export function failedEnablingLocationServices() {
  return {
    type: sharedActionTypes.ENABLING_LOCATION_SERVICES_FAILED,
    title: trans('Location'),
    message: trans('Failed enabling location services. Please check you phones settings.'),
  }
}