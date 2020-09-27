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
import { useDispatch } from 'react-redux';
import { setSnackbar } from '../../redux/ducks/snackbar';

const DisplayRandomIdea = ({
  handleClose,
  randomIdea,
  signedInUser,
  getCompletedIdeas
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // console.log(randomIdea);
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    (async () => {
      if (await signedInUser) {
        setUsername(signedInUser.username);
        setToken(signedInUser.signInUserSession.idToken.jwtToken);
      }
    })();
  }, []);

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

  const getIndoorOutdoorImg = async () => {
    for (const location in indoorOutdoor) {
      if (location === (await randomIdea.idea.indoor_outdoor)) {
        setIndoorOutdoorSrc(indoorOutdoor[location]);
      }
    }
  };

  const getWeatherImg = async () => {
    for (const item in weather) {
      if (item === (await randomIdea.idea.weather)) {
        setWeatherSrc(weather[item]);
      }
    }
  };

  useEffect(() => {
    (async () => {
      if (randomIdea.idea && randomIdea.idea.cost) getCostImg();

      if (randomIdea.idea && randomIdea.idea.indoor_outdoor)
        getIndoorOutdoorImg();

      if (randomIdea.idea && randomIdea.idea.weather) getWeatherImg();
    })();
  }, [randomIdea]);

  const handleAccept = async (e) => {
    e.preventDefault();
    console.log(randomIdea.idea.id);

    try {
      const res = await axios({
        method: 'post',
        url: `http://localhost:4000/completed`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          email: username,
          token: token,
          id: randomIdea.idea.id,
          isCompleted: 1
        }
      });
    } catch (error) {
      console.log(error);
    }

    handleClose();
    getCompletedIdeas();
  };

  const handleDecline = (e) => {
    e.preventDefault();
    handleClose();
  };

  const deletePictureFromS3 = async (e) => {
    try {
      const res = await axios({
        method: 'delete',
        url: `http://localhost:4000/idea/pic`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          email: username,
          token: token,
          uuid: randomIdea.idea.picture
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    deletePictureFromS3();

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
    } catch (error) {
      console.log(error);
    }

    handleClose();
    getCompletedIdeas();
    dispatch(setSnackbar(true, 'success', 'Idea deleted'));
  };

  return (
    <>
      {!randomIdea.idea || !randomIdea.idea.title ? (
        <Preloader />
      ) : (
        <Card className={classes.paper}>
          <div className={classes.root}>
            <Grid
              container
              spacing={2}
              direction='row'
              justify='space-evenly'
              alignItems='center'
            >
              <Grid item xs={12} md={6}>
                <CardHeader
                  title={randomIdea.idea && randomIdea.idea.title}
                  subheader={randomIdea.idea && randomIdea.idea.location}
                />
                <Divider />
                <CardContent>
                  <Typography variant='body1' color='textPrimary' component='p'>
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
                      <Button
                        variant='contained'
                        color='primary'
                        className={classes.webLink}
                      >
                        Visit Website
                      </Button>
                    </Link>
                  ) : null}
                </Card>
              </Grid>
            </Grid>
            <div className={classes.bottomContainer}>
              <CardActions>
                <Button
                  className={classes.yesBtn}
                  onClick={handleAccept}
                  variant='contained'
                >
                  Yes
                </Button>
                <Button
                  className={classes.noBtn}
                  onClick={handleDecline}
                  variant='contained'
                >
                  No
                </Button>
                <Button
                  className={classes.deleteBtn}
                  onClick={handleDelete}
                  variant='contained'
                  color='secondary'
                >
                  Delete
                </Button>
              </CardActions>
            </div>
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
    backgroundColor: '#FFF',
    width: '80vw',
    overflow: 'auto',
    boxShadow: theme.shadows[5],
    padding: '1rem'
  },
  root: {
    flexGrow: 1
  },
  imagePaper: {
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  yesBtn: {
    backgroundColor: '#E75734',
    color: '#fff',
    margin: '1rem',
    '&:hover': {
      backgroundColor: '#CF4F30'
    }
  },
  deleteBtn: {
    backgroundColor: '#8C8C8C',
    color: '#fff',
    margin: '1rem',
    '&:hover': {
      backgroundColor: '#737373'
    }
  },
  noBtn: {
    backgroundColor: '#147E9C',
    color: '#fff',
    margin: '1rem',
    '&:hover': {
      backgroundColor: '#116A82'
    }
  },
  mr1: {
    marginRight: '1rem'
  },
  webLink: {
    margin: '1rem 0',
    backgroundColor: '#0E64B3',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#0C5599',
      textDecoration: 'none'
    }
  },
  iconContainer: {
    margin: '3rem 0'
  },
  bottomContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
}));

export default DisplayRandomIdea;
