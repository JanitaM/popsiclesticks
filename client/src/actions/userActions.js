import { ADD_USER, CURRENT_USER } from './types';

// POST user to server
export const addUser = (user) => async (dispatch) => {
  console.log('userAction', user);
};

// Sign In to server
export const signIn = (currentUser) => async (dispatch) => {
  console.log('signIn', currentUser);
};
