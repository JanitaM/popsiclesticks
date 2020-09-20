import React from 'react';
import { Button, Typography, Link, Paper, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const Landing = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.heroImg}>
        <div className={classes.heroText}>
          <Typography variant='h3'>What Are You Doing Today?</Typography>
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
            Your next adventure, date night, book, restaurant, country...
          </Typography>
        </div>
      </div>
    </div>
  );
};

const useStyles = makeStyles({
  container: {
    color: '#171721'
  },
  heroImg: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background:
      'rgba(0,0,0,0.2) url("https://images.pexels.com/photos/869258/pexels-photo-869258.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundBlendMode: 'overlay',
    position: 'relative'
  },
  heroText: {
    textAlign: 'center',
    position: 'absolute',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  heroImg2: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background:
      'rgba(0,0,0,0.2) url("https://images.pexels.com/photos/1251852/pexels-photo-1251852.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260")',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundBlendMode: 'overlay',
    position: 'relative'
  },
  heroText2: {
    textAlign: 'center',
    position: 'absolute',
    top: '25%',
    left: '20%',
    transform: 'translate(-50%, -50%)'
  },
  heroImg3: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background:
      'rgba(0,0,0,0.2) url("https://datenightguide.com/wp-content/uploads/2017/10/personal.jpg")',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundBlendMode: 'overlay',
    position: 'relative'
  },
  heroText3: {
    textAlign: 'center',
    position: 'absolute',
    top: '20%',
    left: '75%',
    transform: 'translate(-50%, -50%)',
    width: '450px'
  },
  bodyContainer: {
    maxWidth: '90vw',
    margin: '0 auto'
  },
  whatIsTitle: {
    marginTop: '2rem',
    textAlign: 'center'
  },
  whatIsBody: {
    marginTop: '1rem',
    textAlign: 'center'
  }
});

export default Landing;
