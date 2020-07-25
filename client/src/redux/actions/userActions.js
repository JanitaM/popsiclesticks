import {
  SIGNIN_USER,
  SIGNOUT_USER,
  SET_LOADING,
  USER_ERROR,
  USER_LOADED,
  USER_LOADING
} from './types';
import { Auth, Storage } from 'aws-amplify';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

// Sign In to AWS
export const signIn = (currentUser) => async (dispatch) => {
  console.log(currentUser); //this works

  try {
    const userInfo = await Auth.signIn(
      currentUser.username,
      currentUser.password
    );
    const user = await Auth.currentAuthenticatedUser();
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
  dispatch({ type: USER_LOADING });

  // const history = useHistory();

  const user = await Auth.currentAuthenticatedUser();
  console.log(user);

  dispatch({
    type: USER_LOADED,
    payload: user
  });
  // .then(() => history.push('/'));
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