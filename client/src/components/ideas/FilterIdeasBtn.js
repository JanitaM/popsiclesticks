import React, { useState } from 'react';
import FilterListIcon from '@material-ui/icons/FilterList';
import { Fab, makeStyles, Dialog } from '@material-ui/core';
import FilterModal from '../ideas/FilterModal';
import axios from 'axios';

const FilterIdeasBtn = ({ signedInUser, filteredIdeas, setFilteredIdeas }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

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
        />
      </Dialog>
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
  }
}));

export default FilterIdeasBtn;
