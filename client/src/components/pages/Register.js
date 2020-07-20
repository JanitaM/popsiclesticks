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
import { registerUser } from '../../actions/userActions';
import { useHistory } from 'react-router-dom';

const Register = ({ registerUser }) => {
  const classes = useStyles();
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilepic, setProfilePic] = useState(undefined);
  const [confirmationCode, setConfirmationCode] = useState('');

  // need to add alerts
  const onSubmit = (e) => {
    e.preventDefault();

    registerUser({ email, password, profilepic, confirmationCode });
    handleNext();
  };

  const handleNext = () => {
    history.push('/register/confirm');
  };

  return (
    <div className={classes.container}>
      <div>
        <Typography variant='h3' className={classes.m1}>
          Register
        </Typography>
        <Typography gutterBottom>It's free and only takes a minute.</Typography>
        <form
          onSubmit={onSubmit}
          className={classes.formContainer}
          autoComplete='off'
        >
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

          <Typography gutterBottom className={classes.m1}>
            Optional - Upload a profile pic
          </Typography>
          <div className={classes.uploadContainer}>
            <Avatar src={profilepic} className={classes.image} />
            <input
              accept='image/*'
              className={classes.uploadInput}
              id='upload-btn'
              multiple
              type='file'
              name='profilepic'
              label='profilepic'
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
    backgroundColor: '#ccc',
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
    justifyContent: 'center',
    marginBottom: '1rem'
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
  registerUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  console.log(state.user.newUser);
  return {
    newUser: state.user.newUser
  };
};

export default connect(mapStateToProps, { registerUser })(Register);
