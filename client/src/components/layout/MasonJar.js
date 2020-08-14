import React, { useState } from 'react';
import masonJar from '../../assets/masonJar.png';
import './MasonJar.css';
import DisplayRandomIdea from '../ideas/DisplayRandomIdea';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Auth } from 'aws-amplify';

const MasonJar = () => {
  const classes = useStyles();
  const [token, setToken] = useState('');
  const [randomIdea, setRandomIdea] = useState({});
  const [open, setOpen] = useState(false);

  const getUserIdeas = async (e) => {
    e.preventDefault();

    const fullInfo = await Auth.currentAuthenticatedUser();
    const token = await fullInfo.signInUserSession.idToken.jwtToken;
    const username = await fullInfo.username;

    try {
      if (fullInfo) {
        setToken(token);

        const res = await axios({
          method: 'get',
          url: `http://localhost:4000/user/ideas`,
          params: {
            email: username,
            token: token
          }
        });
        // console.log(res.data.message);
        const ideaArr = res.data.message;
        getRandomIdea(ideaArr);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getRandomIdea = (ideaArr) => {
    console.log(ideaArr);
    if (ideaArr.length < 0) {
      return alert('no ideas in the database');
    }

    let randomIndex = Math.floor(Math.random() * ideaArr.length);

    console.log(ideaArr[randomIndex]);
    setRandomIdea(ideaArr[randomIndex]);
    handleOpen();
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='main-container'>
      <div className='img-container'>
        <div className='sticks-container'>
          <button onClick={getUserIdeas} className='btn1 btn'></button>
          <button onClick={getUserIdeas} className='btn2 btn'></button>
          <button onClick={getUserIdeas} className='btn3 btn'></button>
          <button onClick={getUserIdeas} className='btn4 btn'></button>
          <button onClick={getUserIdeas} className='btn5 btn'></button>
        </div>
        <div className='jar-container'>
          <img src={masonJar} alt='mason-jar' className='jar-img' />
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
        className={classes.modal}
      >
        <DisplayRandomIdea
          token={token}
          handleClose={handleClose}
          randomIdea={randomIdea}
        />
      </Modal>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

export default MasonJar;
