import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import './UserNavbar.css';
import { connect } from 'react-redux';
import { signOut, user } from '../../redux/actions/userActions';
import { Avatar, makeStyles } from '@material-ui/core';

const UserDesktopNavbar = ({ signOut, user, profilePic }) => {
  const classes = useStyles();
  const history = useHistory();

  const handleOnClick = (e) => {
    e.preventDefault();

    signOut();
    history.push('/');
  };

  return (
    <div className={classes.sectionDesktop}>
      <Avatar
        src={user.user && profilePic}
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

UserDesktopNavbar.propTypes = {
  signOut: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps, { signOut })(UserDesktopNavbar);
