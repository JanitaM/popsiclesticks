import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { user } from '../redux/actions/userActions';
import Preloader from '../components/layout/Preloader';

const PrivateRoutes = ({ user, component: Component, ...rest }) => {
  console.log(user.user);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (user.user) {
          return <Redirect to='/signin' />;
        } else if (user.isAuthenticated) {
          return <Component {...props} />;
        }
      }}
    />
  );
};

// PrivateRoutes.propTypes = {
//   token: PropTypes.object.isRequired,
//   isAuthenticated: PropTypes.object.isRequired
// };

const mapStateToProps = (state) => {
  console.log(state);
  return {
    user: state.user //should have access to this.props.auth
  };
};

export default connect(mapStateToProps)(PrivateRoutes);
