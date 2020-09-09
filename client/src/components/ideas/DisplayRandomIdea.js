import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Typography,
  Button
} from '@material-ui/core';
import Preloader from '../layout/Preloader';

const DisplayRandomIdea = ({ handleClose, randomIdea, token, email }) => {
  const classes = useStyles();
  console.log(randomIdea);

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

    try {
      const res = await axios({
        method: 'delete',
        url: `http://localhost:4000/user/idea`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          email: email,
          token: token,
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
      {!randomIdea.idea && randomIdea.ideaPic ? (
        <Preloader />
      ) : (
        <Card className={classes.paper}>
          <div className={classes.root}>
            <Grid container spacing={2}>
              {/* Left Container */}
              <Grid item xs={12} md={6}>
                <CardHeader
                  title={randomIdea.idea && randomIdea.idea.title}
                  subheader={randomIdea.idea && randomIdea.idea.location}
                />
                <Divider />
                <CardContent>
                  <Typography
                    variant='body2'
                    color='textSecondary'
                    component='p'
                  >
                    {randomIdea.idea && randomIdea.idea.description}
                  </Typography>
                </CardContent>
              </Grid>
              {/* Right Container */}
              <Grid item xs={12} md={6}>
                <Card className={classes.imagePaper}>
                  <img
                    src={
                      randomIdea.ideaPic
                        ? randomIdea.ideaPic
                        : 'https://pagehardware.files.wordpress.com/2018/07/popsicle.jpg'
                    }
                    alt={randomIdea.idea && randomIdea.idea.title}
                    className={classes.media}
                  />
                  {randomIdea.idea && randomIdea.idea.url ? (
                    <Button
                      variant='contained'
                      color='primary'
                      href={randomIdea.idea.url}
                    >
                      Visit Website
                    </Button>
                  ) : null}
                </Card>
              </Grid>
            </Grid>
            {/* Bottom Container */}
            <Grid container spacing={2}>
              {/* Left Container */}
              <Grid item xs={6}>
                <CardActions>
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
              </Grid>
              {/* Right Container */}
              <Grid item xs={6}>
                <CardActions>
                  <Button
                    className={classes.m1}
                    // onClick={handleAccept}
                    variant='contained'
                    color='primary'
                  >
                    Completed?
                  </Button>
                </CardActions>
              </Grid>
            </Grid>
          </div>
        </Card>
      )}
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  media: {
    height: '250px',
    margin: '1rem'
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
  root: {
    flexGrow: 1
  },
  imagePaper: {
    // padding: '16px 0',
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  m1: {
    margin: '1rem'
  }
}));

export default DisplayRandomIdea;
