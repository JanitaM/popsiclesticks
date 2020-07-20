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
    position: 'absolute',
    bottom: '0',
    right: '0'
  },
  btn: {
    margin: '.5rem'
  }
}));

AddEditIdeaBtns.propTypes = {};

export default AddEditIdeaBtns;
