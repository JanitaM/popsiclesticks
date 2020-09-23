import React from 'react';
import { Auth } from 'aws-amplify';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  TextField,
  Grid,
  Typography,
  makeStyles,
  Container,
  Button
} from '@material-ui/core';

const ResetPasswordPage = ({ userInfo, setUserInfo, setIsSignInPage }) => {
  const classes = useStyles();

  const resetPassword = async (e) => {
    e.preventDefault();

    if (!userInfo.username || !userInfo.code || !userInfo.new_password) {
      alert('Please enter all info');
      return;
    }

    try {
      await Auth.forgotPasswordSubmit(
        userInfo.username,
        userInfo.code,
        userInfo.new_password
      )
        .then((data) => console.log(data))
        .then(() => {
          setIsSignInPage(true);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Typography component='h1' variant='h5' className={classes.title}>
        Please check your email for a reset code.
      </Typography>
      <form noValidate autoComplete='off'>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant='outlined'
              required
              fullWidth
              label='Email'
              name='email'
              value={userInfo.username}
              onChange={(e) =>
                setUserInfo({ ...userInfo, username: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant='outlined'
              required
              fullWidth
              label='Reset Code'
              name='code'
              value={userInfo.code}
              onChange={(e) =>
                setUserInfo({ ...userInfo, code: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant='outlined'
              required
              fullWidth
              type='password'
              label='New Password'
              name='new_password'
              value={userInfo.new_password}
              onChange={(e) =>
                setUserInfo({ ...userInfo, new_password: e.target.value })
              }
            />
          </Grid>
        </Grid>

        <Button onClick={resetPassword} className={classes.resetBtn}>
          Reset Password
        </Button>
      </form>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'center',
    margin: '2rem'
  },
  resetBtn: {
    color: '#fff',
    width: '100%',
    margin: '1rem 0',
    backgroundColor: '#E75734',
    '&:hover': {
      backgroundColor: '#EC795D'
    }
  }
}));

export default ResetPasswordPage;
