import React from 'react';
import { Link, navigate } from '@reach/router';
import './UserNavbar.css';
import { Avatar, makeStyles } from '@material-ui/core';

const UserDesktopNavbar = ({ signOut, signedInUser, profilePic }) => {
  const classes = useStyles();

  const handleOnClick = (e) => {
    e.preventDefault();

    // signOut();
    navigate('/');
  };

  return (
    <div className={classes.sectionDesktop}>
      <Avatar
        src={signedInUser && profilePic}
        alt='user profile picture'
        className={classes.image}
        variant='rounded'
      />
      <Link to='/account' className={classes.desktopLink}>
        Account Settings
      </Link>
      <Link to='/' className={classes.desktopLink}>
        <button onClick={handleOnClick} className='signOutBtnD signOutBtn'>
          Sign Out
        </button>
      </Link>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  sectionDesktop: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  desktopLink: {
    marginRight: '1rem',
    color: '#fff',
    fontSize: '1.25rem'
  },
  image: {
    textAlign: 'center',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: '2.5rem',
    height: '2.5rem',
    marginRight: '1rem'
  },
  mobileLink: {
    fontSize: '1.25rem',
    width: '50vw',
    color: '#fff'
  }
}));

export default UserDesktopNavbar;
