import { API_URL } from '@/services/api';
import { CurrentUserActionTypes, SET_CURRENT_USER } from '../types/currentUserTypes';
import { Dispatch } from 'redux';

export const setCurrentUser = (user: any): CurrentUserActionTypes => ({
  type: SET_CURRENT_USER,
  payload: user,
});

export const fetchCurrentUser = () => {
  return async (dispatch: Dispatch<CurrentUserActionTypes>) => {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage

    if (!token) {
      return; // Handle case when there is no token
    }

    try {
      const response = await fetch(`${API_URL}auth/current_user`, {
        method: 'GET',  
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch current user');
      }

      const data = await response.json();
      dispatch(setCurrentUser(data.user)); // Dispatch the user data to the store
    } catch (error) {
      console.error('Error fetching current user:', error);
      // Handle error (e.g., dispatch an error action or show a notification)
    }
  };
};