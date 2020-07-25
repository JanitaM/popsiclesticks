import {
  SIGNIN_USER,
  USER_LOADING,
  USER_LOADED,
  SIGNOUT_USER,
  SET_LOADING,
  USER_ERROR
} from '../actions/types';

const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  token: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_USER:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false
      };
    case USER_LOADING:
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      };
    case SIGNOUT_USER:
      localStorage.removeItem('token');
      return {
        ...state,
        // token: action.payload,
        token: null,
        user: null,
        isAuthenticated: false,
        loading: false
      };
    case USER_ERROR:
      console.error(action.payload);
      localStorage.removeItem('token');
      return {
        ...state,
        error: action.payload,
        token: null,
        user: null,
        isAuthenticated: false,
        loading: false
      };
    default:
      return state;
  }
};
