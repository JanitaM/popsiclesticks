import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddIdeaModal from '../ideas/AddIdeaModal';
import EditIdeas from '../ideas/EditIdeas';

const AddEditIdeaBtns = ({ signedInUser }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <AddIdeaModal signedInUser={signedInUser} />
      <EditIdeas signedInUser={signedInUser} />
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
