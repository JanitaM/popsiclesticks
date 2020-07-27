import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AddIdeaModal from '../ideas/AddIdeaModal';
import EditIdeaModal from '../ideas/EditIdeaModal';
import PropTypes from 'prop-types';

const AddEditIdeaBtns = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <AddIdeaModal />
      <EditIdeaModal />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginTop: '14rem'
  }
}));

AddEditIdeaBtns.propTypes = {};

export default AddEditIdeaBtns;
