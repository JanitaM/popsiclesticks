import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { user } from '../../redux/actions/userActions';
import { connect } from 'react-redux';
import MasonJar from '../layout/MasonJar';
import FilterIdeas from '../ideas/FilterIdeas';
import AddEditIdeaBtns from '../ideas/AddEditIdeaBtns';
import { Auth } from 'aws-amplify';
import axios from 'axios';

const Landing = ({ user }) => {
  const classes = useStyles();

  console.log(user);

  useEffect(() => {
    async function getUserInfo() {
      const fullInfo = await Auth.currentAuthenticatedUser();
      const token = await fullInfo.signInUserSession.idToken.jwtToken;
      console.log(token);

      await axios({
        method: 'get',
        url: `https://ds7m4gu0n5.execute-api.us-east-2.amazonaws.com/dev/user`,
        data: {
          token: token
          // email: email
        }
      });
    }
    getUserInfo();
  }, []);

  return (
    <div className={classes.container}>
      <h1>Pick a stick</h1>
      <FilterIdeas className={classes.filter} />
      <MasonJar />
      <AddEditIdeaBtns className={classes.addEdit} />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

// Landing.propTypes = {
//   getIdeas: PropTypes.func.isRequired,
//   getUser: PropTypes.func.isRequired,
// };

const mapStateToProps = (state) => {
  console.log(state);

  return {
    user: state.user
  };
};

// export default connect(mapStateToProps, { getUser, getIdeas })(Landing);
export default Landing;
