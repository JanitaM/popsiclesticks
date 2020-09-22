import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const Landing = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.heroImg}>
        <div className={classes.heroText}>
          <Typography variant='h3'>What are you doing today?</Typography>
        </div>
      </div>
      <div className={classes.heroImg2}>
        <div className={classes.heroText2}>
          <Typography variant='h3'>Feeling indecisive?</Typography>
        </div>
      </div>
      <div className={classes.heroImg3}>
        <div className={classes.heroText3}>
          <Typography variant='h3'>
            Select your next adventure, date night, book...
          </Typography>
        </div>
      </div>
    </div>
  );
};

const useStyles = makeStyles({
  heroImg: {
    background:
      'url("https://images.pexels.com/photos/869258/pexels-photo-869258.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") no-repeat center center/cover',
    height: '100vh',
    color: '#fff',
    backgroundAttachment: 'fixed',
    backgroundBlendMode: 'overlay',
    position: 'relative'
  },
  heroText: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 2rem 24rem',
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  heroImg2: {
    background:
      'url("https://images.pexels.com/photos/1251852/pexels-photo-1251852.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260") no-repeat center center/cover',
    height: '100vh',
    color: '#fff',
    backgroundAttachment: 'fixed',
    backgroundBlendMode: 'overlay',
    position: 'relative'
  },
  heroText2: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 30rem 2rem 0',
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  heroImg3: {
    background:
      'url("https://datenightguide.com/wp-content/uploads/2017/10/personal.jpg") no-repeat center center/cover',
    height: '100vh',
    color: '#fff',
    backgroundAttachment: 'fixed',
    backgroundBlendMode: 'overlay',
    position: 'relative'
  },
  heroText3: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 2rem',
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.5)'
  }
});

export default Landing;
