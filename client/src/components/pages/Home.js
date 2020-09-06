import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Preloader from '../layout/Preloader';
import MasonJar from '../layout/MasonJar';
import FilterIdeas from '../ideas/FilterIdeasBtn';
import AddEditIdeaBtns from '../ideas/AddEditIdeaBtns';
import { Auth } from 'aws-amplify';

const Home = ({ signedInUser }) => {
  const classes = useStyles();

  // const [signedInUser, setSignedInUser] = useState({
  //   email: '',
  //   token: ''
  // });
  // useEffect(() => {
  //   (async () => {
  //     const fullInfo = await Auth.currentAuthenticatedUser();
  //     const token = await fullInfo.signInUserSession.idToken.jwtToken;
  //     const email = await fullInfo.username;
  //     setSignedInUser({ ...signedInUser, token, email });
  //   })();
  // }, []);

  return (
    <>
      {!signedInUser ? (
        <Preloader />
      ) : (
        <div className={classes.mainContainer}>
          <Grid
            container
            spacing={2}
            direction='column'
            style={{ marginLeft: '1rem' }}
          >
            <Grid item xs={12}>
              <FilterIdeas className={classes.filter} />
            </Grid>

            <Grid
              item
              container
              spacing={6}
              xs={12}
              direction='row'
              justify='flex-end'
              alignItems='flex-end'
            >
              <Grid item xs={12} sm={9}>
                <MasonJar
                  signedInUser={signedInUser}
                  // setSignedInUser={setSignedInUser}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <AddEditIdeaBtns
                  signedInUser={signedInUser}
                  className={classes.addEdit}
                />
              </Grid>
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    maxWidth: 900,
    textAlign: 'center',
    margin: '2rem auto'
  }
}));

export default Home;
