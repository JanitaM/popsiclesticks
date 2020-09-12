import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Link,
  Typography,
  Button
} from '@material-ui/core';
import Preloader from '../layout/Preloader';

const DisplayRandomIdea = ({ handleClose, randomIdea, signedInUser }) => {
  const classes = useStyles();
  console.log(randomIdea);

  const { username, token } = signedInUser;
  const [costSrc, setCostSrc] = useState('');
  const [indoorOutdoorSrc, setIndoorOutdoorSrc] = useState('');
  const [weatherSrc, setWeatherSrc] = useState('');

  const cost = {
    cheap: 'https://img.icons8.com/dusk/64/000000/cheap-2.png',
    average: 'https://img.icons8.com/dusk/64/000000/average-2.png',
    expensive: 'https://img.icons8.com/dusk/64/000000/expensive.png'
  };
  const indoorOutdoor = {
    indoor: 'https://img.icons8.com/dusk/64/000000/home.png',
    outdoor: 'https://img.icons8.com/doodle/48/000000/coniferous-tree.png'
  };
  const weather = {
    sunny: 'https://img.icons8.com/dusk/64/000000/summer.png',
    rain: 'https://img.icons8.com/dusk/64/000000/rain.png',
    snow: 'https://img.icons8.com/dusk/64/000000/snow-storm.png'
  };

  const getCostImg = async () => {
    for (const price in cost) {
      if (price === (await randomIdea.idea.cost)) {
        setCostSrc(cost[price]);
      }
    }
  };
  console.log(costSrc);

  const getIndoorOutdoorImg = async () => {
    for (const location in indoorOutdoor) {
      if (location === (await randomIdea.idea.indoor_outdoor)) {
        setIndoorOutdoorSrc(indoorOutdoor[location]);
      }
    }
  };
  console.log(indoorOutdoorSrc);

  const getWeatherImg = async () => {
    for (const item in weather) {
      if (item === (await randomIdea.idea.weather)) {
        setWeatherSrc(weather[item]);
      }
    }
  };
  console.log(weatherSrc);

  useEffect(() => {
    (async () => {
      if (await randomIdea.idea.cost) {
        console.log(randomIdea.idea.cost);
        getCostImg();
      }
      if (await randomIdea.idea.indoor_outdoor) {
        console.log(randomIdea.idea.indoor_outdoor);
        getIndoorOutdoorImg();
      }
      if (await randomIdea.idea.weather) {
        console.log(randomIdea.idea.weather);
        getWeatherImg();
      }
    })();
  }, [randomIdea.idea]);

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
    console.log(randomIdea.idea);

    try {
      const res = await axios({
        method: 'delete',
        url: `http://localhost:4000/user/idea`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          email: username,
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
      {!randomIdea.idea ? (
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
                  <div className={classes.iconContainer}>
                    {randomIdea.idea.cost ? (
                      <img
                        src={costSrc}
                        alt={randomIdea.idea && randomIdea.idea.cost}
                        className={classes.mr1}
                      />
                    ) : null}
                    {randomIdea.idea.indoor_outdoor ? (
                      <img
                        src={indoorOutdoorSrc}
                        alt={randomIdea.idea && randomIdea.idea.indoor_outdoor}
                        className={classes.mr1}
                      />
                    ) : null}
                    {randomIdea.idea.weather ? (
                      <img
                        src={weatherSrc}
                        alt={randomIdea.idea && randomIdea.idea.weather}
                        className={classes.mr1}
                      />
                    ) : null}
                  </div>
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
                    <Link
                      href={randomIdea.idea.url}
                      rel='noreferrer'
                      size='large'
                      className={classes.webLink}
                    >
                      <Button variant='contained' color='primary'>
                        Visit Website
                      </Button>
                    </Link>
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
                    // onClick={handleComplete}
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
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  m1: {
    margin: '1rem'
  },
  mr1: {
    marginRight: '1rem'
  },
  webLink: {
    margin: '1rem'
  },
  iconContainer: {
    margin: '3rem 0'
  }
}));

export default DisplayRandomIdea;
