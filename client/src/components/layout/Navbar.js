import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { user } from '../../redux/actions/userActions';
import {
  makeStyles,
  AppBar,
  Divider,
  Drawer,
  Toolbar,
  Typography,
  CssBaseline,
  useScrollTrigger,
  Slide,
  IconButton,
  List,
  ListItem,
  Menu
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import popsicle from '../../assets/popsicle.png';
import clsx from 'clsx';
import UserMobileNavBar from '../user/UserMobileNavbar';
import UserDesktopNavbar from '../user/UserDesktopNavbar';
import { Auth } from 'aws-amplify';
import axios from 'axios';

const drawerWidth = 265;

function convertImg(binArr) {
  let arrayBufferView = new Uint8Array(binArr);
  let blob = new Blob([arrayBufferView], { type: 'image/*' });
  let urlCreator = window.url || window.webkitURL;
  let imgUrl = urlCreator.createObjectURL(blob);
  return imgUrl;
}

function HideOnScroll({ children, window }) {
  const trigger = useScrollTrigger(window);

  return (
    <Slide appear={false} direction='down' in={!trigger}>
      {children}
    </Slide>
  );
}

const Navbar = ({ props, user }) => {
  const classes = useStyles();
  const [profilePic, setProfilePic] = useState([]);

  useEffect(() => {
    async function getPhotos() {
      const fullInfo = await Auth.currentAuthenticatedUser();
      const token = await fullInfo.signInUserSession.idToken.jwtToken;
      const username = await fullInfo.username;

      // needs to call s3 bucket
      const res = await axios.get(
        `http://localhost:4000/user/profilepic?email=${username}&token=${token}`,
        {
          data: {
            email: username,
            token: token
          }
        }
      );

      setProfilePic(res.data.map((item) => convertImg(item.Body.data)));
    }
    getPhotos();
  }, []);

  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClick={handleDrawerClose}
      aria-label='open drawer'
      className={classes.mobileMenu}
    >
      <Drawer
        className={classes.drawer}
        anchor='right'
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
        onClose={handleDrawerClose}
      >
        {user.user ? (
          <UserMobileNavBar
            setProfilePic={setProfilePic}
            profilePic={profilePic}
          />
        ) : (
          <List onClick={handleDrawerClose}>
            <ListItem>
              <Link to='/' className={classes.mobileLink}>
                Home
              </Link>
            </ListItem>
            <Divider />
            <ListItem>
              <Link to='/register' className={classes.mobileLink}>
                Register
              </Link>
            </ListItem>
            <Divider />
            <ListItem>
              <Link to='/signin' className={classes.mobileLink}>
                Sign In
              </Link>
            </ListItem>
          </List>
        )}
      </Drawer>
    </Menu>
  );

  return (
    <>
      <CssBaseline />
      <HideOnScroll {...props}>
        <div className={classes.grow}>
          <AppBar>
            <Toolbar>
              <Link to='/'>
                <img src={popsicle} alt='popsicle-icon' />
              </Link>
              <Link to='/'>
                <Typography variant='h6' noWrap className={classes.title}>
                  Popsicle Sticks
                </Typography>
              </Link>
              <div className={classes.grow} />
              {user.user ? (
                <div className={classes.sectionDesktop}>
                  <UserDesktopNavbar
                    setProfilePic={setProfilePic}
                    profilePic={profilePic}
                  />
                </div>
              ) : (
                <div className={classes.sectionDesktop}>
                  <Link to='/' className={classes.desktopLink}>
                    Home
                  </Link>
                  <Link to='/register' className={classes.desktopLink}>
                    Register
                  </Link>
                  <Link to='/signin' className={classes.desktopLink}>
                    Sign In
                  </Link>
                </div>
              )}
              <div className={classes.sectionMobile}>
                <IconButton
                  color='inherit'
                  aria-label='open drawer'
                  onClick={handleDrawerOpen}
                  edge='end'
                  className={clsx(classes.menuButton, open && classes.hide)}
                >
                  <MenuIcon />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
          {renderMobileMenu}
        </div>
      </HideOnScroll>
      <Toolbar />
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  desktopLink: {
    marginRight: '1rem',
    color: '#fff',
    fontSize: '1.25rem'
  },
  mobileLink: {
    fontSize: '2rem',
    width: '50vw',
    color: '#333'
  },
  mobileMenu: {
    '& .MuiPaper-root': {
      backgroundColor: 'lightblue'
    }
  },
  menuButton: {
    color: '#f1f5f8',
    marginRight: theme.spacing(2)
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  title: {
    color: '#fff'
  }
}));

Navbar.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Navbar);
