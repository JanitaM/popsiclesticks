import React from 'react';
import { Link } from '@reach/router';
import { Fab, makeStyles } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { navigate } from '@reach/router';

const useStyles = makeStyles(() => ({
  btn: {
    margin: '.5rem'
  },
  icon: { color: '#fff' }
}));

export default function EditIdea() {
  const classes = useStyles();

  const handleNavigate = () => {
    navigate('/dashboard');
  };

  return (
    <div>
      <Fab
        title='Edit Ideas'
        color='primary'
        aria-label='add'
        className={classes.btn}
        onClick={handleNavigate}
      >
        <Link to='/dashboard'>
          <EditIcon className={classes.icon} />
        </Link>
      </Fab>
    </div>
  );
}
