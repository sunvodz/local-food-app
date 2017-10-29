import * as actionTypes from './actionTypes'
import * as sharedActionTypes from '../../shared/actionTypes';

import { AsyncStorage, Alert } from 'react-native';
import { API_URL } from 'react-native-dotenv';

/**
 * Action - reset alert.
 * @return {object}
 */
export function resetAlert() {
  return {
    type: sharedActionTypes.RESET_ALERT,
    alert: null,
  }
}
