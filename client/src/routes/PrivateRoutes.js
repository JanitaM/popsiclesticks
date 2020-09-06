import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Home from '../components/pages/Home';
import Dashboard from '../components/pages/Dashboard';
import AccountSettings from '../components/pages/AccountSettings';
import NotFound from '../components/pages/NotFound';

const PrivateRoutes = ({ signedInUser }) => {
  console.log(signedInUser);

  return (
    <>
      <Switch>
        <Route
          exact
          path='/home'
          component={Home}
          signedInUser={signedInUser}
        />
        <Route exact path='/dashboard' component={Dashboard} />
        <Route exact path='/account' component={AccountSettings} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
};

export default PrivateRoutes;
