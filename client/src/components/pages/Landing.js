import React from 'react';
import PropTypes from 'prop-types';
import { user } from '../../redux/actions/userActions';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Preloader from '../layout/Preloader';
import MasonJar from '../layout/MasonJar';
import FilterIdeas from '../ideas/FilterIdeasBtn';
import AddEditIdeaBtns from '../ideas/AddEditIdeaBtns';
import { connect } from 'react-redux';

const Landing = ({ user }) => {
  const classes = useStyles();

  return (
    <>
      {user.user && user.loading ? (
        <Preloader />
      ) : (
        <div className={classes.mainContainer}>
          <h1>Pick a stick</h1>
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
                <MasonJar />
              </Grid>
              <Grid item xs={12} sm={3}>
                <AddEditIdeaBtns className={classes.addEdit} />
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

Landing.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Landing);
