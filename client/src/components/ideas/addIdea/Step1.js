import React, { useState } from 'react';
import { makeStyles, TextField } from '@material-ui/core';

const Step1 = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div>
        <form
          // onSubmit={registerUser}
          className={classes.formContainer}
          autoComplete='off'
        >
          <TextField
            required
            variant='outlined'
            label='Title'
            type='text'
            name='title'
            // value={signUpForm.title}
            // onChange={(e) =>
            //   setSignUpForm({ ...signUpForm, title: e.target.value })
            // }
            className={classes.m1}
          />
          <TextField
            variant='outlined'
            label='Location'
            type='text'
            name='location'
            // value={signUpForm.location}
            // onChange={(e) =>
            //   setSignUpForm({ ...signUpForm, location: e.target.value })
            // }
            className={classes.m1}
          />
          <TextField
            variant='outlined'
            label='Description'
            type='text'
            name='description'
            // value={signUpForm.description}
            // onChange={(e) =>
            //   setSignUpForm({ ...signUpForm, description: e.target.value })
            // }
            className={classes.m1}
          />
          <TextField
            variant='outlined'
            label='URL'
            type='url'
            name='url'
            // value={signUpForm.url}
            // onChange={(e) =>
            //   setSignUpForm({ ...signUpForm, url: e.target.value })
            // }
            className={classes.m1}
          />
        </form>
      </div>
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
