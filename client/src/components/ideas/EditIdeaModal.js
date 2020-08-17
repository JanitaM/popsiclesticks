import React from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery, Fab } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { useTheme, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  btn: {
    margin: '.5rem'
  },
  icon: { color: '#fff' }
}));

export default function EditIdeaModal() {
  const classes = useStyles();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <div>
      <Fab
        title='Edit Ideas'
        color='primary'
        aria-label='add'
        className={classes.btn}
      >
        <Link to='/dashboard'>
          <EditIcon className={classes.icon} />
        </Link>
      </Fab>
    </div>
  );
}
