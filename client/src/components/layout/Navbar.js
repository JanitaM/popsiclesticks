import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  useScrollTrigger,
  Slide,
  IconButton,
  Menu,
  MenuItem
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import popsicle from '../../assets/popsicle.png';

function HideOnScroll({ children, window }) {
  const trigger = useScrollTrigger(window);
  return (
    <Slide appear={false} direction='down' in={!trigger}>
      {children}
    </Slide>
  );
}

const Navbar = (props) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  // const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      onClick={handleMenuClose}
      className={classes.mobileMenu}
    >
      <MenuItem>
        <Link to='/' className={classes.mobileLink}>
          Home
        </Link>
      </MenuItem>
      <MenuItem>
        <Link to='/register' className={classes.mobileLink}>
          Register
        </Link>
      </MenuItem>
      <MenuItem>
        <Link to='/signin' className={classes.mobileLink}>
          Sign
        </Link>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <CssBaseline />
      <HideOnScroll {...props}>
        <div className={classes.grow}>
          <AppBar>
            <Toolbar>
              <img src={popsicle} alt='popsicle-icon' />
              <Typography variant='h6' noWrap>
                Popsicle Sticks
              </Typography>
              <div className={classes.grow} />

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

              <div className={classes.sectionMobile}>
                <IconButton
                  aria-label='open drawer'
                  aria-controls={mobileMenuId}
                  aria-haspopup='true'
                  edge='end'
                  onClick={handleMobileMenuOpen}
                  color='inherit'
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
  }
}));

export default Navbar;
