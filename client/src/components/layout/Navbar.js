import React, { useState, useEffect } from 'react';
import { Link } from '@reach/router';
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
import clsx from 'clsx';
import UserMobileNavBar from '../user/UserMobileNavbar';
import UserDesktopNavbar from '../user/UserDesktopNavbar';
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

const Navbar = ({ props, signedInUser, signOut }) => {
  const classes = useStyles();
  const [profilePic, setProfilePic] = useState([]);

  useEffect(() => {
    async function getPhotos() {
      if (signedInUser) {
        const token = await signedInUser.signInUserSession.idToken.jwtToken;
        const username = signedInUser.username;

        const res = await axios.get(
          `http://localhost:4000/user/profilepic?email=${username}&token=${token}`
        );
        // console.log(res.data.Body.data);
        setProfilePic(convertImg(res.data.Body.data));
        // setProfilePic(res.data.map((item) => convertImg(item.Body.data)));
      }
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
        {signedInUser ? (
          <UserMobileNavBar
            profilePic={profilePic}
            signOut={signOut}
            signedInUser={signedInUser}
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
          <AppBar style={{ backgroundColor: '#147E9C' }}>
            <Toolbar>
              <Link to='/'>
                <img
                  src='https://img.icons8.com/cotton/64/000000/ice-pop.png'
                  alt='popsicle-icon'
                />
              </Link>
              <Link to='/'>
                <Typography variant='h6' noWrap className={classes.title}>
                  Popsicle Sticks
                </Typography>
              </Link>
              <div className={classes.grow} />
              {signedInUser ? (
                <div className={classes.sectionDesktop}>
                  <UserDesktopNavbar
                    profilePic={profilePic}
                    signOut={signOut}
                    signedInUser={signedInUser}
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

export default Navbar;
