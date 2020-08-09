import React from 'react';
import PropTypes from 'prop-types';
import { Auth, Storage } from 'aws-amplify';
import { useHistory } from 'react-router-dom';
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
  const history = useHistory();

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
        // url: 'https://ds7m4gu0n5.execute-api.us-east-2.amazonaws.com/dev/user', //serverless not working, revisit later
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
            .then(() => history.push('/signin'))
            .catch((error) => console.log(error));
        } else {
          uploadToSql();
          history.push('/signin');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Typography component='h1' variant='h5'>
        You were emailed a confirmation code. Enter it here.
      </Typography>
      <form
        className={classes.form}
        noValidate
        onSubmit={confirmUser}
        autoComplete='off'
      >
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
        <Button onClick={confirmUser}>Confirm</Button>
      </form>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

ConfirmSignUp.propTypes = {
  confirmUser: PropTypes.func.isRequired
};

export default ConfirmSignUp;
