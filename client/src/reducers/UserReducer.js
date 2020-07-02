import {
  REGISTER_USER,
  SIGNIN_USER,
  SIGNOUT_USER,
  CURRENT_USER,
  SET_LOADING,
  USER_ERROR
} from '../actions/types';

const initialState = {
  user: null,
  currentUser: null,
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        user: action.payload,
        loading: false
      };
    case SIGNIN_USER:
      return {
        ...state,
        user: action.payload,
        loading: false
      };
    case CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
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
