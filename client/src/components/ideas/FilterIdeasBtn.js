import React, { useState } from 'react';
import FilterListIcon from '@material-ui/icons/FilterList';
import { Fab, makeStyles, Dialog, Typography } from '@material-ui/core';
import FilterModal from '../ideas/FilterModal';

const FilterIdeasBtn = ({
  signedInUser,
  filteredIdeas,
  setFilteredIdeas,
  filterValues,
  setFilterValues
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const val = [];
  for (const value in filterValues) {
    val.push(
      <Typography variant='h6' style={{ margin: '0 10px', color: '#CF4F30' }}>
        {filterValues[value]}{' '}
      </Typography>
    );
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.container}>
      <Fab
        title='Filter Ideas'
        color='primary'
        aria-label='add'
        className={classes.btn}
        onClick={handleOpen}
        open={open}
      >
        <FilterListIcon />
      </Fab>

      <Dialog
        fullWidth={true}
        maxWidth={'md'}
        open={open}
        onClose={handleClose}
        aria-labelledby='add-idea-to-database'
      >
        <FilterModal
          signedInUser={signedInUser}
          handleClose={handleClose}
          filteredIdeas={filteredIdeas}
          setFilteredIdeas={setFilteredIdeas}
          filterValues={filterValues}
          setFilterValues={setFilterValues}
        />
      </Dialog>

      <div className={classes.filterParams}>
        <Typography variant='h6'>Filtering on: </Typography>
        <div className={classes.items}>{val}</div>
      </div>
    </div>
  );
};

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    justifySelf: 'flex-start'
  },
  btn: {
    margin: '.5rem'
  },
  filterParams: {
    alignSelf: 'center',
    marginLeft: '1rem',
    display: 'flex',
    flexDirection: 'row'
  },
  items: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

export default FilterIdeasBtn;
