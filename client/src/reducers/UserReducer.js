import { ADD_USER, CURRENT_USER } from '../actions/types';

const initialState = {
  user: null,
  currentUser: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        user: action.payload
      };
    case CURRENT_USER:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
};
