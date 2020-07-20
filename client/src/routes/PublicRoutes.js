import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { user } from '../actions/userActions';
import Home from '../components/pages/Home';
import Register from '../components/pages/Register';
import SignIn from '../components/pages/SignIn';
import NotFound from '../components/pages/NotFound';

const PublicRoutes = ({ user }) => {
  console.log(user);
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/register' component={Register} />
      <Route exact path='/signin' component={SignIn} />
      <Route component={NotFound} />
    </Switch>
  );
};

PublicRoutes.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(PublicRoutes);
