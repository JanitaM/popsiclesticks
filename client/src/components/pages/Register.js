import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import ConfirmSignUp from './ConfirmSignUp';
import {
  Avatar,
  Button,
  makeStyles,
  TextField,
  Typography,
  Input
} from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const Register = () => {
  const classes = useStyles();

  const [isRegisterPage, setIsRegisterPage] = useState(true);

  const [signUpForm, setSignUpForm] = useState({
    email: '',
    password: '',
    profilepic: undefined,
    convertprofilepic: '',
    confirmationCode: ''
  });

  console.log(signUpForm);
  const [signUpUser, setSignUpUser] = useState(undefined);

  if (!isRegisterPage) {
    return (
      <ConfirmSignUp
        setIsRegisterPage={setIsRegisterPage}
        signUpForm={signUpForm}
        setSignUpForm={setSignUpForm}
      />
    );
  }

  const onChange = (e) => {
    setSignUpForm({
      ...signUpForm,
      convertprofilepic: URL.createObjectURL(e.target.files[0]),
      profilepic: e.target.files[0]
    });
  };

  // need to add alerts
  const registerUser = (e) => {
    e.preventDefault();

    if (signUpForm.email === '' || signUpForm.password === '') {
      alert('Please enter an email and password');
    } else {
      try {
        console.log(signUpForm);

        async function signUp() {
          const user = await Auth.signUp({
            username: signUpForm.email, //use username to but pass in email
            password: signUpForm.password,
            attributes: {
              email: signUpForm.email
            }
          });
          setSignUpUser(user);
        }
        signUp();
        // need to alerts
        setIsRegisterPage(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className={classes.container}>
      <div>
        <Typography variant='h3' className={classes.m1}>
          Register
        </Typography>
        <Typography gutterBottom>It's free and only takes a minute.</Typography>
        <form
          onSubmit={registerUser}
          className={classes.formContainer}
          autoComplete='off'
        >
          <TextField
            required
            variant='outlined'
            label='Email'
            type='email'
            name='email'
            value={signUpForm.email}
            onChange={(e) =>
              setSignUpForm({ ...signUpForm, email: e.target.value })
            }
            className={classes.m1}
          />
          <TextField
            required
            variant='outlined'
            label='Password'
            type='password'
            name='password'
            value={signUpForm.password}
            onChange={(e) =>
              setSignUpForm({ ...signUpForm, password: e.target.value })
            }
            className={classes.m1}
          />

          <Typography gutterBottom className={classes.m1}>
            Optional - Upload a profile pic
          </Typography>

          <div className={classes.uploadContainer}>
            <Avatar
              src={signUpForm.convertprofilepic}
              className={classes.image}
            />
            <Input
              accept='image/*'
              className={classes.uploadInput}
              id='upload-btn'
              multiple
              type='file'
              name='profilepic'
              label='profilepic'
              onChange={(e) => onChange(e)}
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

          <Button className={classes.registerBtn} onClick={registerUser}>
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
    backgroundColor: '#fff',
    border: '2px solid #E75734',
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
    backgroundColor: '#A6C1C1',
    marginLeft: '1rem'
  },
  registerBtn: {
    backgroundColor: '#EC795D',
    margin: '1rem'
  },
  image: {
    textAlign: 'center',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }
});

export default Register;
