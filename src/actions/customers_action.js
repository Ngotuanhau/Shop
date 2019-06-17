import axios from 'axios';
import * as Types from './types';

const apiUrl = 'http://192.168.1.198/wordpress-demo/wp-json/wc/v3/customers';

//SHOP GET LIST PRODUCTS-------------------------------------
export const Shop_GetListCustomers = () => {
  return (dispatch) => {
    axios.get(apiUrl)
      .then(response => {
        dispatch(Shop_GetListCustomers_Success(response.data))
      })
      .catch(error => {
        dispatch(Shop_GetListCustomers_Failure(error))
      })
  }
};
export const Shop_GetListCustomers_Success = (customers) => {
  return {
    type: Types.SHOP_GET_CUSTOMERS_SUCCESS,
    customers
  }
};
export const Shop_GetListCustomers_Failure = (error) => {
  return {
    type: Types.SHOP_GET_CUSTOMERS_FAILURE,
    error
  }
};
