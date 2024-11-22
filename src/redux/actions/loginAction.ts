// actions/loginAction.ts

import {
  CurrentUserActionTypes,
  SET_CURRENT_USER
} from '../types/currentUserTypes';
import {
  LoginActionTypes,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT
} from '../types/loginTypes';
import { API_URL } from '@/services/api';
import { Dispatch } from 'redux';

// Thunk action creator for logging in
export const login = (email: string, password: string) => {
  return async (dispatch: Dispatch<LoginActionTypes | CurrentUserActionTypes>) => {
    dispatch({ type: LOGIN_REQUEST });
    console.log('Dispatching LOGIN_REQUEST');

    try {
      const response = await fetch(`${API_URL}auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      console.log('Login successful:', data);
      dispatch({ type: LOGIN_SUCCESS, payload: data.token });
      localStorage.setItem('token', data.token);
      // Dispatch the setCurrentUser action directly
      dispatch({ type: SET_CURRENT_USER, payload: data.user }); // Assuming data.user is the user object
    } catch (error: any) {
      console.error('Login error:', error);
      dispatch({ type: LOGIN_FAILURE, payload: error.message || 'Login failed' });
    }
  };
};

// Logout action creator
export const logout = () => {
  return (dispatch: Dispatch<LoginActionTypes | CurrentUserActionTypes>) => {
    localStorage.removeItem('token'); // Remove token from local storage
    dispatch({ type: LOGOUT }); // Dispatch the logout action
  };
};