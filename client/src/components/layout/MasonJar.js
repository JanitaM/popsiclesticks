import React, { useState, useEffect } from 'react';
import masonJar from '../../assets/masonJar.png';
import './MasonJar.css';
import DisplayRandomIdea from '../ideas/DisplayRandomIdea';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Auth } from 'aws-amplify';

function convertImg(binArr) {
  let arrayBufferView = new Uint8Array(binArr);
  let blob = new Blob([arrayBufferView], { type: 'image/*' });
  let urlCreator = window.url || window.webkitURL;
  let imgUrl = urlCreator.createObjectURL(blob);
  return imgUrl;
}

const MasonJar = () => {
  const classes = useStyles();

  const [signedInUser, setSignedInUser] = useState({
    email: '',
    token: ''
  });

  const [randomIdea, setRandomIdea] = useState({
    idea: {},
    ideaPic: []
  });

  const [open, setOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const fullInfo = await Auth.currentAuthenticatedUser();
      const token = await fullInfo.signInUserSession.idToken.jwtToken;
      const email = await fullInfo.username;
      setSignedInUser({ ...signedInUser, token, email });
    })();
  }, []);

  const getUserIdeas = async (e) => {
    e.preventDefault();

    try {
      if (signedInUser.token) {
        // GET all of the user's ideas
        const res = await axios({
          method: 'get',
          url: `http://localhost:4000/user/ideas`,
          params: {
            email: signedInUser.email,
            token: signedInUser.token
          }
        });
        // console.log(res.data.message);
        const ideaArr = res.data.message;

        if (ideaArr.length > 0) {
          getRandomIdea(ideaArr);
        } else {
          console.log('no ideas in the db');
          return;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getRandomIdea = (ideaArr) => {
    let randomIndex = Math.floor(Math.random() * ideaArr.length);
    checkForIdeaPicture(ideaArr[randomIndex]);
    handleOpen();
  };

  const checkForIdeaPicture = async (idea) => {
    if (!idea.picture) {
      setRandomIdea({ ...randomIdea, idea: idea, ideaPic: null });
    } else {
      getIdeaPic(idea);
    }
  };

  const getIdeaPic = async (idea) => {
    // console.log(idea);

    const res = await axios({
      method: 'post',
      url: 'http://localhost:4000/idea/pic',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        email: signedInUser.email,
        token: signedInUser.token,
        picUuid: idea.picture
      }
    });
    // console.log(await res.data[0].Body.data);
    setRandomIdea({
      ...randomIdea,
      idea: idea,
      ideaPic: convertImg(res.data[0].Body.data)
    });
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
          signedInUser={signedInUser}
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
