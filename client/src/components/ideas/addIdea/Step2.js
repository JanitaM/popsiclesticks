import React, { useState } from 'react';
import { makeStyles, TextField, InputAdornment } from '@material-ui/core';

const Step2 = () => {
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
            variant='outlined'
            label='Cost'
            type='text'
            name='cost'
            // value={signUpForm.cost}
            // onChange={(e) =>
            //   setSignUpForm({ ...signUpForm, cost: e.target.value })
            // }
            className={classes.cost}
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
            startAdornment={<InputAdornment position='start'>$</InputAdornment>}
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
            type='text'
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
  // cost:{
  //     input[type=number]::-webkit-inner-spin-button,
  // input[type=number]::-webkit-outer-spin-button {
  //   -webkit-appearance: none;
  //   margin: 0;
  // }
  // },
  formContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  m1: {
    margin: '1rem'
  }
});

export default Step2;
