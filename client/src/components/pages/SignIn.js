import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const SignIn = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <h1>Signin</h1>
    </div>
  );
};

// SignIn.propTypes = {};

const useStyles = makeStyles({
  container: {
    textAlign: 'center'
  }
});

export default SignIn;
