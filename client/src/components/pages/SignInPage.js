import React from 'react';
import {
  Button,
  CssBaseline,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography
} from '@material-ui/core';

const SignInPage = ({ signInForm, setSignInForm, signIn }) => {
  const classes = useStyles();

  // console.log(signInForm);
  // console.log(setSignInForm);
  // console.log(signIn);

  return (
    <Grid container component='main' className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={6} md={7} className={classes.image} />
      <Grid item xs={12} sm={6} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component='h1' variant='h4'>
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={signIn}>
            <TextField
              required
              variant='outlined'
              label='Email'
              type='text'
              name='username'
              value={signInForm.username}
              onChange={(e) =>
                setSignInForm({ ...signInForm, username: e.target.value })
              }
              className={classes.textfield}
              id='email'
              autoComplete='email'
              autoFocus
            />
            <TextField
              required
              variant='outlined'
              label='Password'
              type='password'
              name='password'
              value={signInForm.password}
              onChange={(e) =>
                setSignInForm({ ...signInForm, password: e.target.value })
              }
              className={classes.textfield}
              id='password'
              autoComplete='current-password'
            />

            <Button
              type='submit'
              variant='contained'
              color='primary'
              className={classes.signInBtn}
              // onClick={onSignIn}
              onClick={signIn}
            >
              Sign In
            </Button>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              className={classes.forgotPasswordBtn}
              // onClick={onSubmit}
            >
              Forgot Password
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: 'calc(100vh - 64px)'
  },
  image: {
    backgroundImage:
      'url(https://images.pexels.com/photos/1274260/pexels-photo-1274260.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  paper: {
    margin: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  textfield: {
    margin: '1rem',
    'input:valid + fieldset': {
      borderBottom: 'solid',
      borderColor: 'green',
      borderWidth: 2
    }
  },
  m1: {
    margin: '1rem'
  },
  signInBtn: {
    backgroundColor: '#E75734',
    margin: '1rem',
    '&:hover': {
      backgroundColor: '#EC795D'
    }
  },
  forgotPasswordBtn: {
    backgroundColor: '#A6C1C1',
    margin: '1rem',
    '&:hover': {
      backgroundColor: '#d5d5d5'
    }
  }
}));

export default SignInPage;
