import React, { useEffect, useState, Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
// import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoutes from './routes/PublicRoutes';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Register from './components/pages/Register';
import SignIn from './components/pages/SignIn';
import Landing from './components/pages/Landing';
import NotFound from './components/pages/NotFound';
import { loadUser } from '../src/redux/actions/userActions';
import './App.css';

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    console.log(store.getState().user);
  });

  return (
    <Provider store={store}>
      <Router>
        <>
          <Navbar />
          <Switch>
            <PublicRoutes exact path='/' component={Home} />
            <PublicRoutes exact path='/register' component={Register} />
            <PublicRoutes exact path='/signin' component={SignIn} />
            <PrivateRoute exact path='/' component={Landing} />
            {/* <Route exact path='/landing' component={Landing} /> */}
            <PublicRoutes component={NotFound} />
          </Switch>
        </>
      </Router>
    </Provider>
  );
};

export default App;
