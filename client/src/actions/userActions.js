import { SIGNIN_USER, SIGNOUT_USER, SET_LOADING, USER_ERROR } from './types';
import { Auth } from 'aws-amplify';

// Sign In to AWS
export const signIn = (currentUser) => async (dispatch) => {
  try {
    setLoading();

    const userInfo = await Auth.signIn(
      currentUser.username,
      currentUser.password
    );

    const user = await Auth.currentAuthenticatedUser();

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

// Set Loading to true
export const setLoading = () => {
  return { type: SET_LOADING };
};
