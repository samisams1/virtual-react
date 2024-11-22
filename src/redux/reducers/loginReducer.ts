import { LoginActionTypes, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../types/loginTypes';

interface LoginState {
  loading: boolean;
  token: string | null;
  error: string | null;
}

const initialState: LoginState = {
  loading: false,
  token: null,
  error: null,
};

export const loginReducer = (state = initialState, action: LoginActionTypes): LoginState => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case LOGIN_SUCCESS:
      return { ...state, loading: false, token: action.payload, error: null };
    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case LOGOUT:
        return {
          ...state,
          token: null,
          error: null,
        };
    default:
      return state;
  }
};

export default loginReducer;