import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, makeStyles, TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import { signIn, user } from '../../redux/actions/userActions';
import { useHistory, Redirect } from 'react-router-dom';

const SignIn = ({ signIn, user }) => {
  // const history = useHistory();
  const classes = useStyles();

  const [currentUser, setCurrentUser] = useState({
    username: '',
    password: ''
  });

  const { username, password } = currentUser;

  const onChange = (e) => {
    setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    signIn(currentUser);
  };

  if (user && user.isAuthenticated) {
    return <Redirect to='/' />;
  } else {
    return (
      <div className={classes.container}>
        <div>
          <h1 className={classes.m1}>Sign In</h1>
          <form
            onSubmit={onSubmit}
            className={classes.formContainer}
            autoComplete='off'
          >
            <TextField
              required
              variant='outlined'
              label='Email'
              type='text'
              name='username'
              value={username}
              onChange={onChange}
              className={classes.m1}
            />
            <TextField
              required
              variant='outlined'
              label='Password'
              type='password'
              name='password'
              value={password}
              onChange={onChange}
              className={classes.m1}
            />
            <Button className={classes.registerBtn} onClick={onSubmit}>
              Sign In
            </Button>
            <Button className={classes.forgotPasswordBtn} onClick={onSubmit}>
              Forgot password
            </Button>
          </form>
        </div>
      </div>
    );
  }
};

const useStyles = makeStyles({
  container: {
    textAlign: 'center',
    backgroundColor: 'pink',
    border: '1px solid #333',
    borderRadius: '.5rem',
    maxWidth: '350px',
    margin: '2rem auto'
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  m1: {
    margin: '1rem'
  },
  registerBtn: {
    backgroundColor: 'orange',
    margin: '1rem'
  },
  forgotPasswordBtn: {
    border: '1px solid blue',
    margin: '1rem'
  }
});

SignIn.propTypes = {
  signIn: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated
});

export default connect(mapStateToProps, { signIn })(SignIn);
