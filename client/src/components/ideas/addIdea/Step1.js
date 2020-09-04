import React, { useEffect } from 'react';
import { makeStyles, TextField } from '@material-ui/core';

const Step1 = ({ ideaForm, setIdeaForm }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <form className={classes.formContainer} autoComplete='off'>
        <TextField
          required
          variant='outlined'
          label='Title'
          type='text'
          name='title'
          value={ideaForm.title}
          onChange={(e) => setIdeaForm({ ...ideaForm, title: e.target.value })}
          className={classes.m1}
        />
        <TextField
          variant='outlined'
          label='Location'
          type='text'
          name='location'
          value={ideaForm.location}
          onChange={(e) =>
            setIdeaForm({ ...ideaForm, location: e.target.value })
          }
          className={classes.m1}
        />
        <TextField
          variant='outlined'
          label='Description'
          type='text'
          name='description'
          value={ideaForm.description}
          onChange={(e) =>
            setIdeaForm({ ...ideaForm, description: e.target.value })
          }
          className={classes.m1}
        />
        <TextField
          variant='outlined'
          label='URL'
          type='url'
          name='url'
          value={ideaForm.url}
          onChange={(e) => setIdeaForm({ ...ideaForm, url: e.target.value })}
          className={classes.m1}
        />
      </form>
    </div>
  );
};

const useStyles = makeStyles({
  container: {
    textAlign: 'center',
    backgroundColor: '#ccc',
    maxWidth: '550px',
    margin: '2rem auto'
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  m1: {
    margin: '1rem'
  }
});

export default Step1;
