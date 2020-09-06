import React from 'react';
import { Router } from '@reach/router';
import Landing from '../components/pages/Landing';
import Register from '../components/pages/Register';
import SignInPage from '../components/pages/SignInPage';
import NotFound from '../components/pages/NotFound';
import Navbar from '../components/layout/Navbar';

const PublicRoutes = ({
  signIn,
  signInForm,
  setSignInForm,
  signInUser,
  signOut
}) => {
  // console.log(signInForm);

  return (
    <>
      <Navbar signInUser={signInUser} signOut={signOut} />
      <Router>
        <Landing path='/' />
        <Register path='/register' />
        <SignInPage
          path='/signin'
          signInForm={signInForm}
          setSignInForm={setSignInForm}
          signIn={signIn}
        />
        <NotFound default />
      </Router>
    </>
  );
};

export default PublicRoutes;
