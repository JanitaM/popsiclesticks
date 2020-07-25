import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { user } from '../redux/actions/userActions';

const PublicRoutes = ({ user, component: Component, restricted, ...rest }) => {
  console.log(user.isAuthenticated); //always true
  console.log(user.user);
  // restricted = false meaning public route
  // restricted = true meaning restricted route
  return (
    <Route
      {...rest}
      render={(props) =>
        user.user && restricted ? <Redirect to='/' /> : <Component {...props} />
      }
    />
  );
};

// PublicRoutes.propTypes = {
//   user: PropTypes.object.isRequired
// };

const mapStateToProps = (state) => {
  console.log(state);
  return {
    user: state.user //should have access to this.props.auth
  };
};

export default connect(mapStateToProps)(PublicRoutes);
