// types/currentUserTypes.ts

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const CLEAR_CURRENT_USER = 'CLEAR_CURRENT_USER';

interface SetCurrentUserAction {
  type: typeof SET_CURRENT_USER;
  payload: any; // Adjust this to match your user data structure
}

interface ClearCurrentUserAction {
  type: typeof CLEAR_CURRENT_USER;
}

export type CurrentUserActionTypes = SetCurrentUserAction | ClearCurrentUserAction;


