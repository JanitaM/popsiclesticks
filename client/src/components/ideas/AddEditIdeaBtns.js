import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddIdeaModal from '../ideas/AddIdeaModal';
import EditIdeaModal from '../ideas/EditIdeaModal';

const AddEditIdeaBtns = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <AddIdeaModal />
      <EditIdeaModal />
    </div>
  );
};

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginTop: '14rem'
  }
}));

export default AddEditIdeaBtns;
