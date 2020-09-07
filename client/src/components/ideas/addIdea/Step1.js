import React from 'react';
import { makeStyles, TextField } from '@material-ui/core';

const Step1 = ({ ideaForm, setIdeaForm }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <form autoComplete='off' className={classes.formContainer}>
        <TextField
          required
          variant='outlined'
          label='Title'
          type='text'
          name='title'
          value={ideaForm.title}
          onChange={(e) => setIdeaForm({ ...ideaForm, title: e.target.value })}
          className={classes.textfields}
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
          className={classes.textfields}
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
          className={classes.textfields}
        />
        <TextField
          variant='outlined'
          label='URL'
          type='url'
          name='url'
          value={ideaForm.url}
          onChange={(e) => setIdeaForm({ ...ideaForm, url: e.target.value })}
          className={classes.textfields}
        />
      </form>
    </div>
  );
};

const useStyles = makeStyles({
  container: {
    textAlign: 'center'
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textfields: {
    margin: '1rem',
    minWidth: '100%'
  }
});

export default Step1;
