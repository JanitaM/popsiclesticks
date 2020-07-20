import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './UserNavbar.css';
import { connect } from 'react-redux';
import { signOut } from '../../actions/userActions';
import { Avatar, makeStyles } from '@material-ui/core';

const UserDesktopNavbar = ({ signOut }) => {
  const classes = useStyles();
  return (
    <div className={classes.sectionDesktop}>
      {/* <Avatar src={profile_pic} className={classes.image} /> */}
      <Avatar src='/broken-image.jpg' className={classes.image} />
      <Link to='/account' className={classes.desktopLink}>
        Account Settings
      </Link>
      <Link to='/' className={classes.desktopLink}>
        <button onClick={signOut} className='signOutBtnD signOutBtn'>
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
