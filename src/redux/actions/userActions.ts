export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST'; // Fixed typo
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS'; // Fixed typo
export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE'; // Fixed typo

import { Dispatch } from 'redux';
import { API_URL } from '@/services/api';
import { CLEAR_CURRENT_USER, CurrentUserActionTypes, SET_CURRENT_USER } from '../types/currentUserTypes';

// Action Types
interface FetchUsersRequestAction {
  type: typeof FETCH_USERS_REQUEST;
}

interface FetchUsersSuccessAction {
  type: typeof FETCH_USERS_SUCCESS;
  payload: User[]; // Replace with your specific user type
}

interface FetchUsersFailureAction {
  type: typeof FETCH_USERS_FAILURE;
  payload: string; // Assuming the error is a string
}

interface CreateUserRequestAction {
  type: typeof CREATE_USER_REQUEST;
}

interface CreateUserSuccessAction {
  type: typeof CREATE_USER_SUCCESS;
  payload: User; // Newly created user
}

interface CreateUserFailureAction {
  type: typeof CREATE_USER_FAILURE;
  payload: string; // Error message
}

// Define your User type
export interface User {
  id: number; // Unique identifier for the user
  fullName: string; // Username of the user
  email: string; // Email address of the user
  role: string; // Role of the user (e.g., 'admin', 'user')
  password:string;
}

// Combine Action Types
export type UserActionTypes =
  | FetchUsersRequestAction
  | FetchUsersSuccessAction
  | FetchUsersFailureAction
  | CreateUserRequestAction
  | CreateUserSuccessAction
  | CreateUserFailureAction;

// Action Creators
export const fetchUsersRequest = (): FetchUsersRequestAction => ({
  type: FETCH_USERS_REQUEST,
});

export const fetchUsersSuccess = (users: User[]): FetchUsersSuccessAction => ({
  type: FETCH_USERS_SUCCESS,
  payload: users,
});

export const fetchUsersFailure = (error: string): FetchUsersFailureAction => ({
  type: FETCH_USERS_FAILURE,
  payload: error,
});

export const createUserRequest = (): CreateUserRequestAction => ({
  type: CREATE_USER_REQUEST,
});

export const createUserSuccess = (user: User): CreateUserSuccessAction => ({
  type: CREATE_USER_SUCCESS,
  payload: user,
});

export const createUserFailure = (error: string): CreateUserFailureAction => ({
  type: CREATE_USER_FAILURE,
  payload: error,
});

// Example Thunk for Fetching Users
export const fetchUsers = () => {
  return async (dispatch: Dispatch<UserActionTypes>) => {
    dispatch(fetchUsersRequest());
    try {
      const response = await fetch(`${API_URL}users`); // Replace with your actual API endpoint
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: User[] = await response.json();

      dispatch(fetchUsersSuccess(data));
    } catch (error: unknown) {
      // Type assertion to handle the error
      if (error instanceof Error) {
        dispatch(fetchUsersFailure(error.message));
      } else {
        dispatch(fetchUsersFailure('An unknown error occurred'));
      }
    }
  };
};


// Thunk for Registering a User
export const register = (user: Omit<User, 'id'>) => {
  return async (dispatch: Dispatch<UserActionTypes>) => {
    dispatch(createUserRequest());

    try {
      const response = await fetch(`${API_URL}users/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      if (!response.ok) throw new Error('Network response was not ok');
      const newUser: User = await response.json();
      dispatch(createUserSuccess(newUser)); // Dispatch success with the new user
    } catch (error) {
      const errorMessage = (error as Error).message || 'An unknown error occurred';
      dispatch(createUserFailure(errorMessage)); // Dispatch failure with the error message
    }
  };
};

export const setCurrentUser = (user: any) => {
  return (dispatch: Dispatch<CurrentUserActionTypes>) => {
    dispatch({ type: SET_CURRENT_USER, payload: user });
  };
};

export const clearCurrentUser = () => {
  return (dispatch: Dispatch<CurrentUserActionTypes>) => {
    dispatch({ type: CLEAR_CURRENT_USER });
  };
};