import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const Landing = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <h1>Landing</h1>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex, alias.
        Tempore, enim nemo! Culpa, dicta esse hic soluta non eaqu
      </p>
    </div>
  );
};

const useStyles = makeStyles({
  container: {
    textAlign: 'center'
  }
});

export default Landing;
