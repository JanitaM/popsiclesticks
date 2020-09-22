import React from 'react';
import { Router } from '@reach/router';
import NotFound from '../components/pages/NotFound';
import Home from '../components/pages/Home';
import Dashboard from '../components/pages/Dashboard';
import AccountSettings from '../components/pages/AccountSettings';
import Navbar from '../components/layout/Navbar';

const PrivateRoutes = ({ signedInUser, signOut }) => {
  return (
    <>
      <Navbar signedInUser={signedInUser} signOut={signOut} />
      <Router>
        <Home path='/' signedInUser={signedInUser} />
        <Dashboard path='/dashboard' />
        <AccountSettings path='/account' />
        <NotFound default />
      </Router>
    </>
  );
};

export default PrivateRoutes;
