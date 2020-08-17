import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const NotFound = () => {
  const classes = useStyles();

  return (
    <div className={classes.notFoundContainer}>
      <h1>Page Not Found</h1>
      <p>This page does not exist on the app.</p>
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
    width: '250px'
  }
});

export default NotFound;
