import * as sharedActionTypes from './../sharedActionTypes';

/**
 *
 * @param {*} error
 * @param {*} dispatch
 */
export function checkMaintenanceMode(dispatch, error) {
  if (error && error.status === 503) {
    dispatch(maintenanceModeEnabled());
  } else {
    dispatch(maintenanceModeDisabled());
  }
}

export function maintenanceModeEnabled() {
  return {
    type: sharedActionTypes.MAINTENANCE_MODE_ENABLED,
  }
}

export function maintenanceModeDisabled() {
  return {
    type: sharedActionTypes.MAINTENANCE_MODE_DISABLED,
  }
}

export function checkIfBackendIsBack() {
  return async function(dispatch, getState) {
    try {
      await api.call({
        url: '/',
      });

      dispatch(maintenanceModeDisabled());
    } catch (error) {
      dispatch(maintenanceModeEnabled());
    }
  }
}