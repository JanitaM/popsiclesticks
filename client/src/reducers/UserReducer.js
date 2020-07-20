import {
  REGISTER_USER,
  CONFIRM_USER,
  SIGNIN_USER,
  SIGNOUT_USER,
  SET_LOADING,
  USER_ERROR
} from '../actions/types';

const initialState = {
  newUser: null,
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        newUser: action.payload,
        loading: false,
        isAuthenticated: false
      };
    case CONFIRM_USER:
      return {
        ...state,
        newUser: action.payload,
        loading: false,
        isAuthenticated: false
      };
    case SIGNIN_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false
      };
    case SIGNOUT_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: false,
        loading: false
      };
    case USER_ERROR:
      console.error(action.payload);
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
