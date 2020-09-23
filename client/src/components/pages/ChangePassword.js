import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { Link } from '@reach/router';
import {
  TextField,
  Grid,
  makeStyles,
  Container,
  Button
} from '@material-ui/core';

const ChangePassword = ({ setIsAccountSettingsPage }) => {
  const classes = useStyles();
  const [userInfo, setUserInfo] = useState({
    oldPassword: '',
    newPassword: ''
  });

  const changePassword = async (e) => {
    e.preventDefault();

    try {
      await Auth.currentAuthenticatedUser()
        .then((user) => {
          console.log(user);
          return Auth.changePassword(
            user,
            userInfo.oldPassword,
            userInfo.newPassword
          );
        })
        .then((data) => console.log(data))
        .then(() => {
          setIsAccountSettingsPage(true);
          alert('Password changed!');
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();

    setIsAccountSettingsPage(true);
  };

  return (
    <Container component='main' maxWidth='xs' style={{ marginTop: '2rem' }}>
      <form noValidate autoComplete='off'>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant='outlined'
              required
              fullWidth
              type='password'
              label='Old Password'
              name='old password'
              value={userInfo.oldPassword}
              onChange={(e) =>
                setUserInfo({ ...userInfo, oldPassword: e.target.value })
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
              name='newPassword'
              value={userInfo.newPassword}
              onChange={(e) =>
                setUserInfo({ ...userInfo, newPassword: e.target.value })
              }
            />
          </Grid>
        </Grid>

        <Button onClick={changePassword} className={classes.resetBtn} fullWidth>
          Reset Password
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

export default ChangePassword;
