import React from 'react';
import FilterListIcon from '@material-ui/icons/FilterList';
import { Fab, makeStyles } from '@material-ui/core';

const FilterIdeasBtn = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Fab
        title='Filter Ideas'
        color='primary'
        aria-label='add'
        className={classes.btn}
      >
        <FilterListIcon />
      </Fab>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifySelf: 'flex-start',
    alignSelf: 'flex-start'
  },
  btn: {
    margin: '.5rem'
  }
}));

export default FilterIdeasBtn;
