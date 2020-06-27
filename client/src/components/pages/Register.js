import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Button,
  makeStyles,
  TextField,
  Typography
} from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { connect } from 'react-redux';
import { addUser } from '../../actions/userActions';

const Register = ({ addUser }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profile_pic, setProfilePic] = useState('');

  // need to add alerts
  const onSubmit = () => {
    addUser({ username, email, password, profile_pic });
  };

  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div>
        <h1 className={classes.m1}>Register</h1>
        <Typography gutterBottom>It's free and only takes a minute.</Typography>
        <form
          onSubmit={onSubmit}
          className={classes.formContainer}
          autoComplete='off'
        >
          <TextField
            required
            variant='outlined'
            label='Username'
            type='text'
            name='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={classes.m1}
          />
          <TextField
            required
            variant='outlined'
            label='Password'
            type='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={classes.m1}
          />
          <TextField
            required
            variant='outlined'
            label='Email'
            type='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={classes.m1}
          />
          <div className={classes.uploadContainer}>
            <Avatar src={profile_pic} className={classes.image} />
            <input
              accept='image/*'
              className={classes.uploadInput}
              id='upload-btn'
              multiple
              type='file'
              name='profile_pic'
              label='profile_pic'
              onChange={(event) => {
                const fileReader = new FileReader();

                fileReader.readAsDataURL(event.target.files[0]);

                fileReader.onload = (e) => {
                  setProfilePic(e.target.result);
                };
              }}
            />
            <label htmlFor='upload-btn'>
              <Button
                variant='contained'
                className={classes.uploadBtn}
                component='span'
                startIcon={<PhotoCamera />}
              >
                Upload
              </Button>
            </label>
          </div>
          <Button className={classes.registerBtn} onClick={onSubmit}>
            Register
          </Button>
        </form>
      </div>
    </div>
  );
};

const useStyles = makeStyles({
  container: {
    textAlign: 'center',
    backgroundColor: 'pink',
    border: '1px solid #333',
    borderRadius: '.5rem',
    maxWidth: '350px',
    margin: '2rem auto'
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  m1: {
    margin: '1rem'
  },
  uploadContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  uploadInput: {
    display: 'none'
  },
  uploadBtn: {
    backgroundColor: 'red',
    marginLeft: '1rem'
  },
  registerBtn: {
    backgroundColor: 'orange',
    margin: '1rem'
  },
  image: {
    textAlign: 'center',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }
});

Register.propTypes = {
  addUser: PropTypes.func.isRequired
};

export default connect(null, { addUser })(Register);
