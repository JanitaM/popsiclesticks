import React, { useState } from 'react';
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

const DisplayRandomIdea = ({ randomIdea, handleClose }) => {
  const classes = useStyles();

  const handleAccept = (e) => {
    e.preventDefault();
    handleClose();
    alert('Go have fun!');
  };

  const handleDecline = (e) => {
    e.preventDefault();
    handleClose();
    alert('Pick another stick!');
  };

  return (
    <Card className={classes.root}>
      <CardHeader title={randomIdea.title} subheader={randomIdea.location} />
      <CardMedia
        className={classes.media}
        image='/static/images/cards/paella.jpg'
        title='Paella dish'
      />
      <CardContent>
        <Typography variant='body2' color='textSecondary' component='p'>
          {randomIdea.title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button onClick={handleAccept} variant='contained' color='primary'>
          Yes
        </Button>
        <Button onClick={handleDecline} variant='contained' color='default'>
          No
        </Button>
        <Button variant='contained' color='secondary'>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  }
}));

export default DisplayRandomIdea;
