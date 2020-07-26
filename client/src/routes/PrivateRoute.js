import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { user } from '../redux/actions/userActions';
import Preloader from '../components/layout/Preloader';
const PrivateRoute = ({ user, component: Component, ...rest }) => {
  // console.log(user.isAuthenticated);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (user.loading) {
          return <Preloader />;
        } else if (!user.loading && user.isAuthenticated) {
          return <Component {...props} />;
        } else {
          return <Redirect to='/signin' />;
        }
      }}
    />
  );
};

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(PrivateRoute);
