import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './UserNavbar.css';
import { connect } from 'react-redux';
import { signOut, user } from '../../redux/actions/userActions';
import { Avatar, makeStyles, Divider, List, ListItem } from '@material-ui/core';

const UserMobileNavbar = ({ user, signOut, setProfilePic, profilePic }) => {
  const [open, setOpen] = useState(false);
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
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
          src={user.user && profilePic[0]}
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
        <button onClick={signOut} className='signOutBtnM signOutBtn'>
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

UserMobileNavbar.propTypes = {
  signOut: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    user: state.user
  };
};

export default connect(mapStateToProps, { signOut })(UserMobileNavbar);
