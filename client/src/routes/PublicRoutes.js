import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from '../components/pages/Landing';
import Register from '../components/pages/Register';
import SignInPage from '../components/pages/SignInPage';
import NotFound from '../components/pages/NotFound';

const PublicRoutes = (props) => {
  console.log(props);
  const { signIn, signInForm, setSignInForm } = props;

  return (
    <>
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/register' component={Register} />
        <Route
          exact
          path='/signin'
          component={SignInPage}
          // signInForm={signInForm}
          // setSignInForm={setSignInForm}
          // signIn={signIn}
          props={props}
        />
        <Route component={NotFound} />
      </Switch>
    </>
  );
};

export default PublicRoutes;
