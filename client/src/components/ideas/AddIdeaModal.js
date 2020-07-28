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

export default function AddIdeaModal() {
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

  return (
    <div>
      <Fab
        color='primary'
        aria-label='add'
        className={classes.btn}
        onClick={handleClickOpen}
        open={open}
        setOpen={setOpen}
        handleClose={handleClose}
      >
        <AddIcon />
      </Fab>

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby='responsive-dialog-title'
      >
        <AddIdeaStepper />
      </Dialog>
    </div>
  );
}
