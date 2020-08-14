import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button
} from '@material-ui/core';

const DisplayRandomIdea = ({ handleClose, randomIdea, token }) => {
  const classes = useStyles();
  const [idea] = useState(randomIdea);
  console.log(token);

  const handleAccept = (e) => {
    e.preventDefault();
    handleClose();
    alert('Go have fun!');
  };

  const handleDecline = (e) => {
    e.preventDefault();
    handleClose();
    // alert('Pick another stick!');
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    console.log(idea);
    console.log(token);

    try {
      const res = await axios({
        method: 'delete',
        url: `http://localhost:4000/user/idea`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          email: idea.email,
          token: token,
          id: idea.id
        }
      });
      handleClose();
      alert('Idea deleted');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className={classes.paper}>
      <CardHeader title={idea.title} subheader={idea.location} />
      <CardMedia
        className={classes.media}
        image='/static/images/cards/paella.jpg'
        title='Paella dish'
      />
      <CardContent>
        <Typography variant='body2' color='textSecondary' component='p'>
          {idea.title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button
          className={classes.m1}
          onClick={handleAccept}
          variant='contained'
          color='primary'
        >
          Yes
        </Button>
        <Button
          className={classes.m1}
          onClick={handleDecline}
          variant='contained'
          color='default'
        >
          No
        </Button>
        <Button
          className={classes.m1}
          onClick={handleDelete}
          variant='contained'
          color='secondary'
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  media: {
    height: '20vh',
    width: '20vw'
  },
  paper: {
    position: 'absolute',
    width: '80vw',
    height: '80vh',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  m1: { margin: '1rem' }
}));

export default DisplayRandomIdea;
