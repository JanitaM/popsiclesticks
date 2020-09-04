import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import ConfirmSignUp from './ConfirmSignUp';
import {
  Avatar,
  Button,
  CssBaseline,
  Grid,
  makeStyles,
  Paper,
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
    <Grid container component='main' className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={6} md={7} className={classes.image} />
      <Grid item xs={12} sm={6} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component='h1' variant='h4'>
            Register
          </Typography>
          <form className={classes.form} onSubmit={registerUser}>
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
              className={classes.textfield}
              id='email'
              autoComplete='email'
              autoFocus
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
              className={classes.textfield}
              id='password'
              autoComplete='current-password'
            />
            <Typography gutterBottom className={classes.m1}>
              Optional - Upload a profile pic
            </Typography>
            <div className={classes.uploadContainer}>
              <Avatar
                src={signUpForm.convertprofilepic}
                className={classes.avatarImage}
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

            <Button
              type='submit'
              variant='contained'
              color='primary'
              className={classes.registerBtn}
              onClick={registerUser}
            >
              Register
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: 'calc(100vh - 64px)'
  },
  image: {
    backgroundImage:
      'url(https://images.pexels.com/photos/3889742/pexels-photo-3889742.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  paper: {
    margin: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center'
  },
  textfield: {
    margin: '1rem',
    'input:valid + fieldset': {
      borderBottom: 'solid',
      borderColor: 'green',
      borderWidth: 2
    }
  },
  m1: {
    margin: '1rem'
  },
  registerBtn: {
    backgroundColor: '#E75734',
    margin: '1rem',
    '&:hover': {
      backgroundColor: '#EC795D'
    }
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
  avatarImage: {
    textAlign: 'center',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }
}));

export default Register;
