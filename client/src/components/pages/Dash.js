import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const Dash = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <h1>Dash</h1>
    </div>
  );
};

const useStyles = makeStyles({
  container: {
    textAlign: 'center'
  }
});

export default Dash;
