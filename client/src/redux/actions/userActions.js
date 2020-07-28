import {
  SIGNIN_USER,
  SIGNOUT_USER,
  SET_LOADING,
  USER_ERROR,
  USER_LOADED,
  USER_LOADING
} from './types';
import { Auth } from 'aws-amplify';

// Sign In to AWS
export const signIn = (currentUser) => async (dispatch) => {
  console.log(currentUser);

  dispatch({ type: USER_LOADING });

  try {
    const userInfo = await Auth.signIn(
      currentUser.username,
      currentUser.password
    );
    const user = await Auth.currentAuthenticatedUser();
    console.log(user);
    const token = await user.signInUserSession.idToken.jwtToken;
    const username = await user.username;
    const data = { user, token };

    dispatch({
      type: SIGNIN_USER,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: USER_ERROR,
      payload: error.response
    });
  }
};

// CHECK TOKEN & LOAD USER
export const loadUser = () => async (dispatch, getState) => {
  // dispatch({ type: USER_LOADING });

  const user = await Auth.currentAuthenticatedUser();
  console.log(user);

  dispatch({
    type: USER_LOADED,
    payload: user
  });
};

// Sign Out to AWS
export const signOut = (user) => (dispatch) => {
  try {
    // setLoading();
    dispatch({ type: USER_LOADING });

    const user = Auth.signOut({ global: true });

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
