import { SWISH_STARTED, SWISH_SUCCESS, SWISH_FAILED } from 'app/types/swish'
import {API_URL} from 'app/env.json'
import {Linking, AsyncStorage } from 'react-native'
import api from 'app/shared/api';

export function swishStarted() {
  return {
    type: SWISH_STARTED,
  }
}
export function swishSuccess(membership_payments_relationship) {
  return {
    type: SWISH_SUCCESS,
    membership_payments_relationship: membership_payments_relationship,
    title: 'payment_success_header',
    message: 'payment_success',
  }
}
export function swishFailed() {
  return {
    type: SWISH_FAILED,
  }
}



export function startSwish(amount) {
  return async function (dispatch, getState) {
    try {
      dispatch(swishStarted());
  
      // this.props.dispatch(sharedActions.processSwishPayment(amount));
      // const test_url = "https://fc4cca89.ngrok.io"
      // API_URL
  
      // let response = await fetch(`${API_URL}/api/v1/swish?amount=${amount}`, {
      //   method: 'post',
      //   headers: {
      //     'Accept': 'application/json',
      //     'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      //   }
      // });

      let response = await api.call({
        url: `/api/v1/swish?amount=${amount}`,
        amount: amount,
        method: 'POST',
      });
  
      const res = await response.json();
      console.log(res);
  
      try {
        const url = `swish://paymentrequest?token=${res.payment_reference}&callbackurl=localfoodapp://swishFinished`
        console.log(url);
        
        Linking.openURL(url);
      } catch(e) {
        console.log(e);
        
      }
      // check status
      
      setTimeout(() => waitForSwishResponse(dispatch, res, 0), 1000);

      // dispatch(receiveNotifications(notifications.reverse()));

      
    } catch (error) {
      dispatch(swishFailed(error));
    }
  }
}

async function waitForSwishResponse(dispatch, res, i) {
  // let response = await fetch(`${API_URL}/api/v1/swish?id=${res.external_id}`, {
  //   method: 'get',
  //   headers: {
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
  //   }
  // });
  let response = await api.call({
    url: `/api/v1/swish?id=${res.external_id}`,
    id: res.external_id,
  });
  // const text = await response.text();
  const jres = await response.json();
  // console.log(jres);
  
  // setTimeout(this.waitForSwishResponse, 1000);
  if (jres.status === 'CREATED') {
    if (i < 300) {
      setTimeout(() => waitForSwishResponse(dispatch, res, i+1), 3000);
    } else {
      dispatch(swishFailed("timeout"))
    }
  } else if (jres.status === 'PAID') {
    // this.props.
    let storedUser = await AsyncStorage.getItem('@store:user');
    storedUser = JSON.parse(storedUser);
    let updatedUser = Object.assign({}, storedUser, {membership_payments_relationship: jres.user_membership_payment});
    await AsyncStorage.setItem('@store:user', JSON.stringify(updatedUser));
    // console.log(updatedUser);
    
    dispatch(swishSuccess(jres.user_membership_payment))
  }
}