import React, { useState, useEffect } from 'react';
import { Typography, Button, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Auth } from 'aws-amplify';
import axios from 'axios';
import ChangePassword from '../pages/ChangePassword';

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
  const [date, setDate] = useState('');

  useEffect(() => {
    (async () => {
      const fullInfo = await Auth.currentAuthenticatedUser();
      const token = await fullInfo.signInUserSession.idToken.jwtToken;
      const username = await fullInfo.username;
      setSignedInUser({ token, username });

      if (token) getPhotos(token, username);
      if (token) getUserInfo(token, username);
    })();
  }, []);

  const getPhotos = async (token, username) => {
    try {
      const res = await axios.get(
        `http://localhost:4000/user/profilepic?email=${username}&token=${token}`
      );
      // console.log(res.data.Body.data);
      if (res.data) setProfilePic(convertImg(res.data.Body.data));
    } catch (error) {
      console.log(error);
    }
  };

  const getUserInfo = async (token, username) => {
    if (token) {
      try {
        const res = await axios.get(
          `http://localhost:4000/user?email=${username}&token=${token}`
        );
        // console.log(res.data.message[0]);
        const fullInfo = res.data.message[0];
        const date = fullInfo.date.split('T');
        setDate(date[0]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const [isAccountSettingsPage, setIsAccountSettingsPage] = useState(true);

  if (!isAccountSettingsPage) {
    return (
      <ChangePassword setIsAccountSettingsPage={setIsAccountSettingsPage} />
    );
  }

  const handleChangePassword = (e) => {
    e.preventDefault();

    setIsAccountSettingsPage(false);
  };

  return (
    <div className={classes.container}>
      <Paper className={classes.content}>
        <img
          src={
            profilePic.length > 0
              ? profilePic
              : 'https://pagehardware.files.wordpress.com/2018/07/popsicle.jpg'
          }
          className={classes.profilePic}
        />

        <div className={classes.userInfo}>
          <Typography variant='h6' component='h6' className={classes.item}>
            Hello, {signedInUser.username}!
          </Typography>
          <Typography variant='h6' component='h6' className={classes.item}>
            Member since: {date}
          </Typography>
          <Button
            onClick={handleChangePassword}
            className={classes.updateBtn}
            fullWidth
          >
            Change Password
          </Button>
        </div>
      </Paper>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: '400px',
    margin: '2rem auto',
    textAlign: 'center'
  },
  content: {
    border: '2px solid #65B5B4',
    borderRadius: '6px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '2rem',
    marginTop: '6rem',
    position: 'relative'
  },
  profilePic: {
    border: '2px solid #65B5B4',
    borderRadius: '6px',
    maxWidth: '150px',
    minHeight: '150px',
    position: 'absolute',
    top: '-50px'
  },
  userInfo: {
    margin: '6rem 0 2rem'
  },
  item: {
    margin: '1rem 0',
    width: '100%'
  },
  updateBtn: {
    backgroundColor: '#E75734',
    color: '#fff',
    margin: '1rem 0',
    '&:hover': {
      backgroundColor: '#CF4F30'
    }
  }
}));

export default AccountSettings;
