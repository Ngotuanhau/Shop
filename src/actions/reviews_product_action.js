import axios from 'axios';
import * as Types from './types';

const apiUrl = 'http://192.168.1.198/wordpress-demo/wp-json/wc/v3/products/reviews';

export const Shop_GetListReviews = () => {
  return (dispatch) => {
    axios.get(apiUrl)
      .then(response => {
        console.log(response)
        dispatch(Shop_GetListReviews_Success(response.data))
      })
      .catch(error => {
        dispatch(Shop_GetListReviews_Failure(error))
      })
  }
};

export const Shop_GetListReviews_Success = (reviews) => {
  return {
    type: Types.SHOP_GET_REVIEWS_SUCCESS,
    reviews
  }
};

export const Shop_GetListReviews_Failure = (error) => {
  return {
    type: Types.SHOP_GET_REVIEWS_FAILURE,
    error
  }
};
