import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import PublicRoutes from './routes/PublicRoutes';
import PrivateRoutes from './routes/PrivateRoutes';
import './App.css';
import { navigate } from '@reach/router';

const App = () => {
  const [signedInUser, setSignedInUser] = useState({
    username: '',
    token: ''
  });

  const [signInForm, setSignInForm] = useState({
    username: '',
    password: ''
  });

  async function signIn(e) {
    e.preventDefault();

    try {
      const user = await Auth.signIn(signInForm.username, signInForm.password);

      setSignedInUser(user);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  function signOut() {
    try {
      Auth.signOut({ global: true }).then(() => setSignedInUser(undefined));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    (async () => {
      const user = await Auth.currentAuthenticatedUser();
      const token = await user.signInUserSession.idToken.jwtToken;
      const username = user.username;
      setSignedInUser({ ...signedInUser, token: token, username: username });
    })();
  }, []);

  return (
    <>
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
