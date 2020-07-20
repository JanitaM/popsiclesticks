import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
import { confirmUser, newUser } from '../../../actions/userActions';

const ConfirmSignUp = ({ confirmUser, newUser }) => {
  const classes = useStyles();
  const history = useHistory();

  // console.log(newUser); //this works
  const [confirmationCode, setConfirmationCode] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    confirmUser(confirmationCode, newUser);
    handleNext(); //only after confirmed user
  };

  const handleNext = () => {
    history.push('/signin');
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
        onSubmit={onSubmit}
        autoComplete='off'
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              onChange={(e) => setConfirmationCode(e.target.value)}
              variant='outlined'
              required
              fullWidth
              label='Confirmation Code'
              name='confirmationCode'
              value={confirmationCode}
            />
          </Grid>
        </Grid>
        <Button onClick={onSubmit}>Confirm</Button>
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

const mapStateToProps = (state) => {
  console.log(state);

  return {
    newUser: state.user.newUser
  };
};

export default connect(mapStateToProps, { confirmUser })(ConfirmSignUp);
