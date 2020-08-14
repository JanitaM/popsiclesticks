import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Register from './components/pages/Register';
import SignIn from './components/pages/SignIn';
import Landing from './components/pages/Landing';
import NotFound from './components/pages/NotFound';
import './App.css';

const App = () => {
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
          <Route component={NotFound} />
        </Switch>
      </>
    </Router>
  );
};

export default App;
