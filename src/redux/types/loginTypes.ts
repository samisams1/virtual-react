// loginTypes.ts

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT'; // Added LOGOUT action type

// Interface for LOGIN_REQUEST action
interface LoginRequestAction {
  type: typeof LOGIN_REQUEST;
}

// Interface for LOGIN_SUCCESS action
interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: string; // The token
}

// Interface for LOGIN_FAILURE action
interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
  payload: string; // Error message
}

// Interface for LOGOUT action
interface LogoutAction {
  type: typeof LOGOUT; // Correctly define the LOGOUT action
}

// Combined type for all login actions
export type LoginActionTypes =
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | LogoutAction; // Include the LogoutAction