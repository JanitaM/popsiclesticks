import React from 'react';
import { navigate } from '@reach/router';
import { Auth, Storage } from 'aws-amplify';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  TextField,
  Grid,
  Typography,
  makeStyles,
  Container,
  Button
} from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const ConfirmSignUp = ({ signUpForm, setSignUpForm }) => {
  const classes = useStyles();

  const confirmUser = async (e) => {
    e.preventDefault();

    async function uploadToSql(myUuid) {
      console.log('upload to mysql');

      let data = { email: signUpForm.email };
      if (myUuid) {
        data = { ...data, profilepic: myUuid };
      }

      return await axios({
        method: 'post',
        url: 'http://localhost:4000/user',
        data: data
      });
    }

    try {
      const response = await Auth.confirmSignUp(
        signUpForm.email,
        signUpForm.confirmationCode
      );

      if (response === 'SUCCESS') {
        const myUuid = uuidv4();

        if (signUpForm.profilepic) {
          const type = signUpForm.profilepic.type.split('/');
          Storage.put(
            `${signUpForm.email}/profilepics/${myUuid}.${type[1]}`,
            signUpForm.profilepic,
            {
              contentType: 'image/*'
            }
          )
            .then((result) => console.log(result))
            .then(() => uploadToSql(myUuid))
            .then(() => navigate('/signin'))
            .catch((error) => console.log(error));
        } else {
          uploadToSql();
          navigate('/signin');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Typography component='h1' variant='h5' className={classes.title}>
        You were emailed a confirmation code. Enter it here.
      </Typography>
      <form noValidate onSubmit={confirmUser} autoComplete='off'>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              onChange={(e) =>
                setSignUpForm({
                  ...signUpForm,
                  confirmationCode: e.target.value
                })
              }
              variant='outlined'
              required
              fullWidth
              label='Confirmation Code'
              name='confirmationCode'
              value={signUpForm.confirmationCode}
            />
          </Grid>
        </Grid>
        <Button onClick={confirmUser} className={classes.confirmBtn}>
          Confirm
        </Button>
      </form>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'center',
    margin: '2rem'
  },
  confirmBtn: {
    width: '100%',
    margin: '1rem 0',
    backgroundColor: '#E75734',
    '&:hover': {
      backgroundColor: '#EC795D'
    }
  }
}));

export default ConfirmSignUp;
