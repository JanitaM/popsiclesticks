import React, { useState, useEffect } from 'react';
import { Divider, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Preloader from '../layout/Preloader';
import MasonJar from '../layout/MasonJar';
import FilterIdeas from '../ideas/FilterIdeasBtn';
import AddEditIdeaBtns from '../ideas/AddEditIdeaBtns';
import axios from 'axios';

const Home = ({ signedInUser }) => {
  const classes = useStyles();
  const [completedIdeas, setCompletedIdeas] = useState([]);

  useEffect(() => {
    getCompletedIdeas();
  }, []);

  async function getCompletedIdeas() {
    if (signedInUser) {
      const token = await signedInUser.signInUserSession.idToken.jwtToken;
      const username = signedInUser.username;

      const res = await axios({
        method: 'get',
        url: `http://localhost:4000/completedIdeas`,
        params: {
          email: username,
          token: token
        }
      });
      console.log(res.data.message);
      const ideaArr = res.data.message;
      setCompletedIdeas(ideaArr);
    }
  }

  if (!signedInUser) {
    return <Preloader />;
  } else {
    return (
      <>
        <div className={classes.mainContainer}>
          <div className={classes.topContainer}>
            <FilterIdeas />
          </div>

          <Grid container spacing={2} direction='row'>
            <Grid item xs={12} sm={3}>
              <Typography variant='h5' gutterBottom>
                Completed Ideas
              </Typography>
              <Divider />

              {completedIdeas.map((idea) => {
                return (
                  <Typography variant='body1' className={classes.ideaTitle}>
                    {idea.title}
                  </Typography>
                );
              })}
            </Grid>

            <Grid item xs={12} sm={6}>
              <MasonJar
                signedInUser={signedInUser}
                getCompletedIdeas={getCompletedIdeas}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <AddEditIdeaBtns
                signedInUser={signedInUser}
                className={classes.addEdit}
              />
            </Grid>
          </Grid>
        </div>
      </>
    );
  }
};

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    maxWidth: 1100,
    textAlign: 'center',
    margin: '2rem auto'
  },
  topContainer: {
    marginBottom: '1rem'
  },
  ideaTitle: {
    margin: '1rem'
  }
}));

export default Home;
