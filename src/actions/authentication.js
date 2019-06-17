import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../token/setAuthToken';
import jwt_decode from 'jwt-decode';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

//Login - get token
export const loginUser = (user) => dispatch => {
  axios.post('http://192.168.1.198/wordpress-demo/wp-json/jwt-auth/v1/token', user)
    .then(response => {
      // console.log(response)
      const { token } = response.data;
      cookies.set('jwtToken', token);
      setAuthToken(token)
      const decode = jwt_decode(token)
      dispatch(setCurrentUser(decode))
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    })
}

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

export const registerUser = (user, history) => dispatch => {
  axios.post('/api/users/register', user)
    .then(res => history.push('/login'))
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    });
}

export const logoutUser = (history) => dispatch => {
  cookies.remove('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  history.push('/login');
}