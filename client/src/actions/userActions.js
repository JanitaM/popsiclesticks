import {
  REGISTER_USER,
  SIGNIN_USER,
  SIGNOUT_USER,
  CURRENT_USER,
  SET_LOADING,
  USER_ERROR
} from './types';
import { Auth } from 'aws-amplify';

// POST user to server
export const registerUser = (user) => async (dispatch) => {
  console.log('userAction', user);
};

// Sign In to AWS
export const signIn = (currentUser) => async (dispatch) => {
  try {
    setLoading();

    const user = await Auth.signIn(currentUser.username, currentUser.password);

    dispatch({
      type: SIGNIN_USER,
      payload: user
    });
  } catch (error) {
    dispatch({
      type: USER_ERROR,
      payload: error.response
    });
  }
};

// Sign Out to AWS
export const signOut = (user) => (dispatch) => {
  try {
    setLoading();

    const test = Auth.signOut({ global: true });
    // .then(()=> {})
    console.log(test);

    dispatch({
      type: SIGNOUT_USER,
      payload: user
    });
  } catch (error) {
    dispatch({
      type: USER_ERROR,
      payload: error.response
    });
  }
};

// Set Loading to true - Done
export const setLoading = () => {
  return { type: SET_LOADING };
};
