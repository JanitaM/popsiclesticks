import React, { useState, useEffect } from 'react';
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Link,
  Typography,
  Button,
  Paper
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import { Auth } from 'aws-amplify';
import axios from 'axios';

function convertImg(binArr) {
  let arrayBufferView = new Uint8Array(binArr);
  let blob = new Blob([arrayBufferView], { type: 'image/*' });
  let urlCreator = window.url || window.webkitURL;
  let imgUrl = urlCreator.createObjectURL(blob);
  return imgUrl;
}

const AccountSettings = () => {
  const classes = useStyles();
  const [signedInUser, setSignedInUser] = useState({
    token: '',
    email: ''
  });
  const [profilePic, setProfilePic] = useState([]);

  useEffect(() => {
    (async () => {
      const fullInfo = await Auth.currentAuthenticatedUser();
      const token = await fullInfo.signInUserSession.idToken.jwtToken;
      const username = await fullInfo.username;
      setSignedInUser({ token, username });

      if (token) getPhotos(token, username);
    })();
  }, []);

  const getPhotos = async (token, username) => {
    try {
      const res = await axios.get(
        `http://localhost:4000/user/profilepic?email=${username}&token=${token}`
      );
      // console.log(res.data.Body.data);
      setProfilePic(convertImg(res.data.Body.data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.container}>
      <Typography variant='h4' component='h1'>
        Account Settings
      </Typography>
      <Paper className={classes.content}>
        <img src={profilePic} className={classes.profilePic} />

        <div className={classes.userInfo}>
          <Typography variant='h6' component='h6' className={classes.item}>
            Email: {signedInUser.username}
          </Typography>
          <Typography variant='h6' component='h6' className={classes.item}>
            Member since:{' '}
          </Typography>
          <Button
            variant='outlined'
            color='secondary'
            fullWidth
            style={{ padding: '10px' }}
          >
            Reset Password
          </Button>
        </div>
      </Paper>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  container: {
    maxWidth: '1100px',
    margin: '2rem auto',
    textAlign: 'center'
  },
  content: {
    border: '2px solid blue',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
    marginTop: '2rem'
  },
  profilePic: {
    width: '400px',
    margin: '0 2rem'
  },
  item: {
    border: '1px solid #000',
    borderRadius: '4px',
    padding: '10px',
    margin: '1rem 0',
    width: '100%'
  }
}));

export default AccountSettings;
