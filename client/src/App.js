import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import PublicRoutes from './routes/PublicRoutes';
import PrivateRoutes from './routes/PrivateRoutes';
import './App.css';
import { navigate } from '@reach/router';
import Snackbar from '../src/components/layout/Snackbar';
import { useDispatch } from 'react-redux';
import { setSnackbar } from '../src/redux/ducks/snackbar';

const App = () => {
  const dispatch = useDispatch();

  const [signedInUser, setSignedInUser] = useState(undefined);
  const [signInForm, setSignInForm] = useState({
    username: '',
    password: ''
  });

  async function signIn(e) {
    e.preventDefault();

    if (!signInForm.username || !signInForm.password) {
      dispatch(setSnackbar(true, 'error', 'Please enter all information'));
      return;
    }

    try {
      const user = await Auth.signIn(signInForm.username, signInForm.password);
      setSignedInUser(user);
      navigate('/');
    } catch (error) {
      console.log(error);
      dispatch(setSnackbar(true, 'error', error.message));
    }
  }

  function signOut() {
    try {
      Auth.signOut({ global: true }).then(() => {
        setSignedInUser(undefined);
        setSignInForm({});
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    (async () => {
      const user = await Auth.currentAuthenticatedUser();
      setSignedInUser(user);
    })();
  }, []);

  return (
    <>
      <Snackbar />
      {signedInUser ? (
        <PrivateRoutes signedInUser={signedInUser} signOut={signOut} />
      ) : (
        <PublicRoutes
          signIn={signIn}
          setSignInForm={setSignInForm}
          signInForm={signInForm}
          signedInUser={signedInUser}
          signOut={signOut}
        />
      )}
    </>
  );
};

export default App;
