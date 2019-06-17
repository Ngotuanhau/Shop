import axios from 'axios';
import * as Types from './types';

const apiUrl = 'http://192.168.1.198/wordpress-demo/wp-json/wc/v3/products';

//SHOP GET LIST PRODUCTS-------------------------------------
export const Shop_GetListProducts = () => {
  return (dispatch) => {
    axios.get(apiUrl)
      .then(response => {
        dispatch(Shop_GetListProducts_Success(response.data))
      })
      .catch(error => {
        dispatch(Shop_GetListProducts_Failure(error))
      })
  }
};
export const Shop_GetListProducts_Success = (products) => {
  return {
    type: Types.SHOP_GET_PRODUCTS_SUCCESS,
    products
  }
};
export const Shop_GetListProducts_Failure = (error) => {
  return {
    type: Types.SHOP_GET_PRODUCTS_FAILURE,
    error
  }
};

//SHOP GET PRODUCT BY ID-------------------------------------
export const Shop_GetProduct_By_ID = (id) => {
  return (dispatch) => {
    axios.get(`${apiUrl}/${id}`)
      .then(response => {
        dispatch(Shop_GetProduct_By_ID_Success(response))
      })
      .catch(error => {
        dispatch(Shop_GetProduct_By_ID_Failure(error))
      })
  }
};
export const Shop_GetProduct_By_ID_Success = (product) => {
  return {
    type: Types.SHOP_GET_PRODUCT_BY_ID_SUCCESS,
    product
  }
};
export const Shop_GetProduct_By_ID_Failure = (error) => {
  return {
    type: Types.SHOP_GET_PRODUCT_BY_ID_FAILURE,
    error
  }
};

//SHOP CREATE PRODUCT
export const Shop_CreateProduct = (product) => {
  return (dispatch) => {
    axios.post(apiUrl, product)
      .then(response => {
        console.log(response)
        dispatch(createProduct_Success(response.data));
      })
      .catch(error => {
        dispatch(createProduct_Failure(error))
      })
  }
};
export const createProduct_Success = (product) => {
  return {
    type: Types.SHOP_CREATE_PRODUCT_SUCCESS,
    product
  }
};
export const createProduct_Failure = (error) => {
  return {
    type: Types.SHOP_CREATE_PRODUCT_FAILURE,
    error
  }
};
