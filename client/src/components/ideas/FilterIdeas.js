import React from 'react';
import FilterListIcon from '@material-ui/icons/FilterList';
import { Typography, Fab, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const FilterIdeas = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Fab color='primary' aria-label='add' className={classes.btn}>
        <FilterListIcon />
      </Fab>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    alignSelf: 'flex-start'
  },
  btn: {
    margin: '.5rem'
  }
}));

FilterIdeas.propTypes = {};

export default FilterIdeas;
