import {
  REGISTER_USER,
  CONFIRM_USER,
  SIGNIN_USER,
  SIGNOUT_USER,
  SET_LOADING,
  USER_ERROR
} from './types';
import { Auth, Storage } from 'aws-amplify';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

// POST user to cognito
export const registerUser = (user) => async (dispatch) => {
  setLoading();
  console.log('user', user); //profile pic is here user.profilepic

  try {
    const newUser = await Auth.signUp({
      username: user.email,
      password: user.password,
      attributes: {
        email: user.email
      }
    });

    dispatch({
      type: REGISTER_USER,
      payload: newUser
    });
  } catch (error) {
    console.log(error);
  }
};

export const confirmUser = (confirmationCode, newUser) => async (dispatch) => {
  setLoading();

  // console.log('confirmationCode', confirmationCode); //this works
  console.log('newUser', newUser.user); //this works

  // profilepic is undefined

  async function uploadToSql() {
    console.log('upload to mysql');

    return await axios({
      method: 'post',
      url: 'https://ds7m4gu0n5.execute-api.us-east-2.amazonaws.com/dev/user',
      data: {
        username: newUser.user.username,
        profilepic: newUser.user.profilepic
      }
    });
  }

  try {
    const response = await Auth.confirmSignUp(
      newUser.user.username,
      confirmationCode
    );

    // prompt(response);
    if (response === 'SUCCESS') {
      // const myUuid = uuidv4();

      Storage.put(
        `${newUser.user.username}/profilepics/${newUser.user.profilepic}`,
        newUser.user.profilepic,
        {
          contentType: 'image/*'
        }
      )
        .then((result) => console.log(result))
        .then(() => uploadToSql(newUser.user.profilepic))
        // .then(() => navigate('/'))
        .catch((error) => console.log(error));
    }

    dispatch({
      type: REGISTER_USER,
      payload: newUser
    });
  } catch (error) {
    console.log(error);
  }
};

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
