// import { api } from 'app/shared';
// import * as actionTypes from './actionTypes';
//
// export function fetchProduct(productId) {
//   return async function (dispatch, getState) {
//     try {
//       dispatch(requestProduct());
//
//       let response = await api.call({
//         url: '/api/v1/products/' + productId
//       });
//
//       let product = response.data;
//
//       dispatch(receiveProduct(product));
//     } catch (error) {
//       console.error(error);
//     }
//   }
// }
//
// export function requestProduct() {
//   return {
//     type: actionTypes.REQUEST_PRODUCT,
//     node: null,
//     loading: true,
//   }
// }
//
// export function receiveProduct(product) {
//   return {
//     type: actionTypes.RECEIVE_PRODUCT,
//     product: product,
//     loading: false,
//   }
// }
