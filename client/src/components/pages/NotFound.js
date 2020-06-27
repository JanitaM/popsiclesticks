import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const NotFound = () => {
  const classes = useStyles();

  return (
    <div className={classes.notFoundContainer}>
      <h1>Page Not Found</h1>
      <p>This page does not exist on the app.</p>
    </div>
  );
};

const useStyles = makeStyles({
  notFoundContainer: {
    margin: '5rem',
    textAlign: 'center'
  }
});

export default NotFound;
