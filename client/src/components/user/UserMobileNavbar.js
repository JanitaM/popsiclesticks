import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './UserNavbar.css';
import { connect } from 'react-redux';
import { signOut, user } from '../../actions/userActions';
import {
  Avatar,
  makeStyles,
  Divider,
  Typography,
  List,
  ListItem
} from '@material-ui/core';

const UserMobileNavbar = ({ user, signOut }) => {
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
        {/* <Avatar src={profile_pic} className={classes.image} /> */}
        <Avatar src='/broken-image.jpg' className={classes.image} />
      </ListItem>
      <ListItem>
        <Typography variant='h4'>Hello {user?.user?.username}</Typography>
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
    textAlign: 'center',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: '5rem',
    height: '5rem',
    padding: '1rem'
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
