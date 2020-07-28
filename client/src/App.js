import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Register from './components/pages/Register';
import SignIn from './components/pages/SignIn';
import Landing from './components/pages/Landing';
import NotFound from './components/pages/NotFound';
import './App.css';
import { loadUser, user } from './redux/actions/userActions';

const App = ({ loadUser, user }) => {
  // const [signedInUser, setSignedInUser] = useState(undefined)
  // useEffect(() => {
  //   (async () => {
  //     const user = await Auth.currentAuthenticatedUser();
  //     setSignedInUser(user);
  //   })();
  // }, []);

  // store.dispatch(loadUser());

  return (
    <Provider store={store}>
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/signin' component={SignIn} />
            {/* <PrivateRoute exact path='/landing' component={Landing} /> */}
            <Route exact path='/landing' component={Landing} />
            <Route component={NotFound} />
          </Switch>
        </>
      </Router>
    </Provider>
  );
};

export default App;
