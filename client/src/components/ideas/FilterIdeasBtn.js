import React from 'react';
import FilterListIcon from '@material-ui/icons/FilterList';
import { Fab, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const FilterIdeasBtn = () => {
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
    display: 'flex',
    justifySelf: 'flex-start',
    alignSelf: 'flex-start'
  },
  btn: {
    margin: '.5rem'
  }
}));

FilterIdeasBtn.propTypes = {};

export default FilterIdeasBtn;
