import React from 'react';
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
import Preloader from '../layout/Preloader';

const DisplayRandomIdea = ({ handleClose, randomIdea, signedInUser }) => {
  const classes = useStyles();

  const handleAccept = (e) => {
    e.preventDefault();
    handleClose();
    alert('Go have fun!');
  };

  const handleDecline = (e) => {
    e.preventDefault();
    handleClose();
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    // console.log(randomIdea.idea);
    // console.log(signedInUser.token);

    try {
      const res = await axios({
        method: 'delete',
        url: `http://localhost:4000/user/idea`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          email: signedInUser.email,
          token: signedInUser.token,
          id: randomIdea.idea.id
        }
      });
      handleClose();
      alert('Idea deleted');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!randomIdea.ideaPic ? (
        <Preloader />
      ) : (
        <Card className={classes.paper}>
          <CardHeader
            title={randomIdea.idea.title}
            subheader={randomIdea.idea.location}
          />
          <CardMedia className={classes.media} image={randomIdea.ideaPic} />
          <CardContent>
            <Typography variant='body2' color='textSecondary' component='p'>
              {randomIdea.idea.title}
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
      )}
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  media: {
    height: '30vh',
    width: '30vw'
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
