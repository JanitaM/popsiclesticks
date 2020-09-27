import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

const NotFound = () => {
  const classes = useStyles();

  return (
    <div className={classes.notFoundContainer}>
      <Typography component='h1' variant='h4' gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant='body1' gutterBottom>
        This page does not exist on the app.
      </Typography>
      <img
        src='https://live.staticflickr.com/970/41169508644_c21f5d8aff_b.jpg'
        alt='melting popsicle'
        className={classes.image}
      />
    </div>
  );
};

const useStyles = makeStyles({
  notFoundContainer: {
    margin: '5rem',
    textAlign: 'center'
  },
  image: {
    width: '250px',
    marginTop: '1rem'
  }
});

export default NotFound;
