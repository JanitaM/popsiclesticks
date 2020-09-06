import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import PublicRoutes from './routes/PublicRoutes';
import PrivateRoutes from './routes/PrivateRoutes';
import Navbar from './components/layout/Navbar';
import SignInPage from './components/pages/SignInPage';
import './App.css';

const App = () => {
  const [signedInUser, setSignedInUser] = useState(undefined);
  const [signInForm, setSignInForm] = useState({ username: '', password: '' });

  async function signIn(e) {
    e.preventDefault();

    try {
      console.log(signInForm);
      const user = await Auth.signIn(signInForm.username, signInForm.password);
      setSignedInUser(user);

      console.log(await Auth.currentAuthenticatedUser());
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
      setSignedInUser(user);
    })();
  }, []);

  return (
    <Router>
      <>
        <Navbar signedInUser={signedInUser} signOut={signOut} />
        {signedInUser ? (
          <PrivateRoutes signedInUser={signedInUser} />
        ) : (
          <>
            <PublicRoutes
              signIn={signIn}
              signInForm={signInForm}
              setSignInForm={setSignInForm}
            />

            {/* <SignInPage
              signIn={signIn}
              signInForm={signInForm}
              setSignInForm={setSignInForm}
            /> */}
          </>
        )}
      </>
    </Router>
  );
};

export default App;
