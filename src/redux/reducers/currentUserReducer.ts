// reducers/currentUserReducer.ts

import { CurrentUserActionTypes, SET_CURRENT_USER, CLEAR_CURRENT_USER } from '../types/currentUserTypes';

interface CurrentUserState {
  currentUser: any | null; // Adjust the type according to your user data structure
}

const initialState: CurrentUserState = {
  currentUser: null,
};

const currentUserReducer = (state = initialState, action: CurrentUserActionTypes): CurrentUserState => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, currentUser: action.payload };
    case CLEAR_CURRENT_USER:
      return { ...state, currentUser: null };
    default:
      return state;
  }
};

export default currentUserReducer;