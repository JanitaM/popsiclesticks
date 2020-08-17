import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Register from './components/pages/Register';
import SignIn from './components/pages/SignIn';
import Landing from './components/pages/Landing';
import Dashboard from './components/pages/Dashboard';
import AccountSettings from './components/pages/AccountSettings';
import NotFound from './components/pages/NotFound';
import './App.css';

const App = () => {
  const [signedInUser, setSignedInUser] = useState({
    email: '',
    token: ''
  });
  useEffect(() => {
    (async () => {
      const fullInfo = await Auth.currentAuthenticatedUser();
      const token = await fullInfo.signInUserSession.idToken.jwtToken;
      const email = await fullInfo.username;
      setSignedInUser({ ...signedInUser, token, email });
    })();
  }, []);

  return (
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/signin' component={SignIn} />

          <PrivateRoute exact path='/home' component={Home} />
          {/* <Route exact path='/home' component={Home} /> */}

          <Route exact path='/dashboard' component={Dashboard} />
          {/* <PrivateRoute exact path='/dashboard' component={Dashboard} /> */}

          <PrivateRoute exact path='/account' component={AccountSettings} />
          <Route component={NotFound} />
        </Switch>
      </>
    </Router>
  );
};

export default App;
