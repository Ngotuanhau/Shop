import axios from 'axios';
import * as Types from './types';

const apiUrl = 'http://192.168.1.198/wordpress-demo/wp-json/wc/v3/orders';

//SHOP GET ORDERS----------------------------------------
export const Shop_GetOrders = () => {
  return (dispatch) => {
    axios.get(apiUrl)
      .then(response => {
        dispatch(Shop_GetOrders_Success(response.data))
      })
      .catch(error => {
        dispatch(Shop_GetOrders_Failure(error))
      })
  }
};
export const Shop_GetOrders_Success = (orders) => {
  return {
    type: Types.SHOP_GET_ORDERS_SUCCESS,
    orders
  }
};
export const Shop_GetOrders_Failure = (error) => {
  return {
    type: Types.SHOP_GET_ORDERS_FAILURE,
    error
  }
};

//SHOP CREATE ORDER--------------------------------
export const Shop_Create_Order = (order) => {
  return (dispatch) => {
    axios.post(apiUrl, order)
      .then(response => {
        dispatch(Shop_Create_Order_Success(response.data))
      })
      .catch(error => {
        dispatch(Shop_Create_Order_Failure(error))
      })
  }
};
export const Shop_Create_Order_Success = (order) => {
  return {
    type: Types.SHOP_CREATE_ORDER_SUCCESS,
    order
  }
};
export const Shop_Create_Order_Failure = (error) => {
  return {
    type: Types.SHOP_CREATE_ORDER_FAILURE,
    error
  }
};

//SHOP GET ORDER BY ID--------------------------------
export const Shop_GetOrder_By_ID = (id) => {
  return (dispatch) => {
    axios.get(`${apiUrl}/${id}`)
      .then(response => {
        dispatch(Shop_GetOrder_By_ID_Success(response.data))
      })
      .catch(error => {
        dispatch(Shop_GetOrder_By_ID_Failure(error))
      })
  }
};
export const Shop_GetOrder_By_ID_Success = (order) => {
  return {
    type: Types.SHOP_GET_ORDER_BY_ID_SUCCESS,
    order
  }
};
export const Shop_GetOrder_By_ID_Failure = (error) => {
  return {
    type: Types.SHOP_GET_ORDER_BY_ID_FAILURE,
    error
  }
};
