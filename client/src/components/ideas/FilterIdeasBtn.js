import React, { useState } from 'react';
import FilterListIcon from '@material-ui/icons/FilterList';
import { Fab, makeStyles, Dialog } from '@material-ui/core';
import FilterModal from '../ideas/FilterModal';
import axios from 'axios';

const FilterIdeasBtn = ({ signedInUser }) => {
  console.log(signedInUser);
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // setIdeaForm({});
  };

  const getUserIdeas = async (e) => {
    e.preventDefault();

    try {
      if (signedInUser) {
        const token = await signedInUser.signInUserSession.idToken.jwtToken;
        const username = signedInUser.username;

        // GET all of the user's ideas
        // const res = await axios({
        //   method: 'get',
        //   url: `http://localhost:4000/user/ideas`,
        //   params: {
        //     email: username,
        //     token: token
        //   }
        // });
        // console.log(res.data.message);
        // const ideaArr = res.data.message;
        // if (ideaArr.length > 0) {
        //   getRandomIdea(ideaArr);
        // } else {
        //   alert('no ideas in the db');
        //   return;
        // }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.container}>
      <Fab
        title='Filter Ideas'
        color='primary'
        aria-label='add'
        className={classes.btn}
        onClick={handleOpen}
        open={open}
      >
        <FilterListIcon />
      </Fab>

      <Dialog
        fullWidth={true}
        maxWidth={'md'}
        open={open}
        onClose={handleClose}
        aria-labelledby='add-idea-to-database'
      >
        <FilterModal handleClose={handleClose} />
      </Dialog>
    </div>
  );
};

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    justifySelf: 'flex-start'
  },
  btn: {
    margin: '.5rem'
  }
}));

export default FilterIdeasBtn;
