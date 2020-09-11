import React, { useState } from 'react';
import {
  Dialog,
  useMediaQuery,
  Fab,
  useTheme,
  makeStyles
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import AddIdeaStepper from '../ideas/AddIdeaStepper';

const useStyles = makeStyles((theme) => ({
  btn: {
    margin: '.5rem'
  }
}));

export default function AddIdeaModal({ signedInUser }) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [ideaForm, setIdeaForm] = useState({
    title: '',
    location: '',
    description: '',
    cost: '',
    indoorOutdoor: '',
    category: '',
    url: '',
    picture: undefined,
    convertIdeaPic: '',
    weather: ''
  });

  return (
    <div>
      <Fab
        color='primary'
        aria-label='add'
        className={classes.btn}
        onClick={handleClickOpen}
        open={open}
        title='Add Idea'
      >
        <AddIcon />
      </Fab>

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby='add-idea-to-database'
      >
        <AddIdeaStepper
          ideaForm={ideaForm}
          signedInUser={signedInUser}
          setIdeaForm={setIdeaForm}
          handleClose={handleClose}
        />
      </Dialog>
    </div>
  );
}
