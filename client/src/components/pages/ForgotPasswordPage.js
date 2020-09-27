import React, { useState } from 'react';
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
import ResetPasswordPage from './ResetPasswordPage';
import { useDispatch } from 'react-redux';
import { setSnackbar } from '../../redux/ducks/snackbar';

const ForgotPasswordPage = ({ setIsSignInPage, setSignInForm }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [userInfo, setUserInfo] = useState({
    username: '',
    code: '',
    new_password: ''
  });

  const [isForgotPasswordPage, setIsForgotPasswordPage] = useState(true);

  if (!isForgotPasswordPage) {
    return (
      <ResetPasswordPage
        setIsSignInPage={setIsSignInPage}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
      />
    );
  }

  const sendCode = async (e) => {
    e.preventDefault();

    if (!userInfo.username) {
      dispatch(setSnackbar(true, 'error', 'Please enter your email'));
      return;
    }

    try {
      await Auth.forgotPassword(userInfo.username)
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }

    setIsForgotPasswordPage(false);
  };

  const handleCancel = (e) => {
    e.preventDefault();

    setIsSignInPage(true);
    setSignInForm({});
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Typography component='h1' variant='h4' className={classes.title}>
        Reset Your Password
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
        </Grid>
        <Button onClick={sendCode} className={classes.resetBtn}>
          Send Reset Code
        </Button>
        <Button onClick={handleCancel} className={classes.cancelBtn} fullWidth>
          Cancel
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
  },
  cancelBtn: {
    backgroundColor: '#8C8C8C',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#737373'
    }
  }
}));

export default ForgotPasswordPage;
