import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
        {/* <DialogTitle id='responsive-dialog-title'>
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color='primary'>
            Save
          </Button>
          <Button onClick={handleClose} color='primary' autoFocus>
            Cancel
          </Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}
