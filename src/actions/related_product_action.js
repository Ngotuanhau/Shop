import axios from 'axios';
import * as Types from './types';

const apiUrl = (arrId = []) => `http://192.168.1.198/wordpress-demo/wp-json/wc/v3/products/?include=${arrId.join(',')}`;

//SHOP GET RELATED PRODUCTS-------------------------------------
export const Shop_GetRelatedProducts = (arrId) => {
  return (dispatch) => {
    axios.get(apiUrl(arrId))
      .then(response => {
        dispatch(Shop_GetRelatedProducts_Success(response.data))
      })
      .catch(error => {
        dispatch(Shop_GetRelatedProducts_Failure(error))
      })
  }
};
export const Shop_GetRelatedProducts_Success = (relatedproducts) => {
  return {
    type: Types.SHOP_GET_RELATED_PRODUCTS_SUCCESS,
    relatedproducts
  }
};
export const Shop_GetRelatedProducts_Failure = (error) => {
  return {
    type: Types.SHOP_GET_RELATED_PRODUCTS_FAILURE,
    error
  }
}