import { AsyncStorage } from 'react-native';
import * as sharedActionTypes from './../sharedActionTypes';

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

export function setLanguage(lang) {
  return async function(dispatch, getState) {
    try {
      await AsyncStorage.setItem('@store:lang', lang);
      dispatch(setLanguageSuccess(lang));
    } catch (error) {
      dispatch(maintenanceModeEnabled());
    }
  }
}

export function setLanguageSuccess(lang) {
  return {
    type: sharedActionTypes.SET_LANG_SUCCESS,
    lang: lang,
  }
}

export function getLanguages(lang) {
  return async function(dispatch, getState) {
    try {
      let lang = await AsyncStorage.getItem('@store:lang');
      let availableLanguages = [
        {
          key: 'sv',
          label: 'Svenska',
          selected: lang === 'sv',
        },
        {
          key: 'en',
          label: 'English',
          selected: lang === 'en'
        }
      ];

      await AsyncStorage.getItem('@store:lang');
      dispatch(getLanguagesSuccess(availableLanguages));
    } catch (error) {
      dispatch(maintenanceModeEnabled());
    }
  }
}

export function getLanguagesSuccess(availableLanguages) {
  return {
    type: sharedActionTypes.GET_LANGS_SUCCESS,
    availableLanguages: availableLanguages,
  }
}
