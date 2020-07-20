import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { user, isAuthenticated } from '../actions/userActions';

const PrivateRoutes = ({ isAuthenticated, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to='/signin' />
      }
    />
  );
};

PrivateRoutes.propTypes = {
  user: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user,
  isAuthenticated: state.isAuthenticated
});

export default connect(mapStateToProps)(PrivateRoutes);
