import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './UserNavbar.css';
import { Avatar, makeStyles, Divider, List, ListItem } from '@material-ui/core';

const UserMobileNavbar = ({ signedInUser, signOut, profilePic }) => {
  const classes = useStyles();
  const history = useHistory();

  const [open, setOpen] = useState(false);
  const handleDrawerClose = () => {
    setOpen(false);
  };

  console.log(profilePic);

  const handleOnClick = (e) => {
    e.preventDefault();

    signOut();
    history.push('/');
  };

  return (
    <List onClick={handleDrawerClose}>
      <ListItem
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Avatar
          src={signedInUser && profilePic}
          alt='user profile picture'
          className={classes.image}
          variant='rounded'
        />
      </ListItem>
      <Divider />
      <ListItem>
        <Link to='/account' className={classes.mobileLink}>
          Account Settings
        </Link>
      </ListItem>
      <Divider />
      <ListItem>
        <button onClick={handleOnClick} className='signOutBtnM signOutBtn'>
          Sign Out
        </button>
      </ListItem>
      <Divider />
    </List>
  );
};

const useStyles = makeStyles((theme) => ({
  image: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '80%',
    textAlign: 'center',
    padding: '1rem',
    width: '80%'
  },
  mobileLink: {
    color: '#333',
    fontSize: '1.75rem',
    lineHeight: '1.43',
    letterSpacing: '0.01071em',
    width: '50vw'
  }
}));

export default UserMobileNavbar;
