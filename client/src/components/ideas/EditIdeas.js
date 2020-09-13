import React from 'react';
import { Link } from '@reach/router';
import { useMediaQuery, Fab } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { useTheme, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  btn: {
    margin: '.5rem'
  },
  icon: { color: '#fff' }
}));

export default function EditIdea() {
  const classes = useStyles();
  const theme = useTheme();

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
