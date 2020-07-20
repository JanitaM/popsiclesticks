import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MasonJar from '../layout/MasonJar';
import FilterIdeas from '../ideas/FilterIdeas';
import AddEditIdeaBtns from '../ideas/AddEditIdeaBtns';

const Landing = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <h1>Pick a stick</h1>
      <FilterIdeas className={classes.filter} />
      <MasonJar />
      <AddEditIdeaBtns className={classes.addEdit} />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

export default Landing;
