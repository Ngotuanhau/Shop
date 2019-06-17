import axios from 'axios';
import * as Types from './types';

const apiUrl = 'http://192.168.1.198/wordpress-demo/wp-json/wc/v3/products/categories';

//SHOP GET LIST CATEGORIES-------------------------------------
export const Shop_GetListCategories = () => {
  return (dispatch) => {
    axios.get(apiUrl)
      .then(response => {
        // console.log(response)
        dispatch(Shop_GetListCategories_Success(response.data))
      })
      .catch(error => {
        dispatch(Shop_GetListCategories_Failure(error))
      })
  }
};
export const Shop_GetListCategories_Success = (categories) => {
  return {
    type: Types.SHOP_GET_CATEGORIES_SUCCESS,
    categories
  }
};
export const Shop_GetListCategories_Failure = (error) => {
  return {
    type: Types.SHOP_GET_CATEGORIES_FAILURE,
    error
  }
};

