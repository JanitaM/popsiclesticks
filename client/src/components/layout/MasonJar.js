import React, { useState, useEffect } from 'react';
import masonJar from '../../assets/masonJar.png';
import './MasonJar.css';
import DisplayRandomIdea from '../ideas/DisplayRandomIdea';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Preloader from '../layout/Preloader';

function convertImg(binArr) {
  let arrayBufferView = new Uint8Array(binArr);
  let blob = new Blob([arrayBufferView], { type: 'image/*' });
  let urlCreator = window.url || window.webkitURL;
  let imgUrl = urlCreator.createObjectURL(blob);
  return imgUrl;
}

const MasonJar = ({
  signedInUser,
  getCompletedIdeas,
  filteredIdeas,
  setFilteredIdeas
}) => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');
  const [open, setOpen] = useState(false);

  // console.log(filteredIdeas);

  useEffect(() => {
    (async () => {
      if (await signedInUser) {
        setUsername(signedInUser.username);
        setToken(signedInUser.signInUserSession.idToken.jwtToken);
      }
    })();
  }, []);

  const [randomIdea, setRandomIdea] = useState({
    idea: {},
    ideaPic: []
  });

  const getUserIdeas = async (e) => {
    e.preventDefault();

    console.log(filteredIdeas);
    if (filteredIdeas.length > 0) {
      console.log('there are the filtered ideas');
      getRandomIdea(filteredIdeas);
    } else {
      console.log('not using filter');
      try {
        if (token) {
          // GET all of the user's ideas
          const res = await axios({
            method: 'get',
            url: `http://localhost:4000/user/ideas`,
            params: {
              email: username,
              token: token
            }
          });
          const ideaArr = res.data.message;

          if (ideaArr.length > 0) {
            getRandomIdea(ideaArr);
          } else {
            alert('no ideas in the db');
            return;
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getRandomIdea = (ideaArr) => {
    console.log(ideaArr);

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
    if (idea.picture) {
    }
    const res = await axios({
      method: 'post',
      url: 'http://localhost:4000/idea/pic',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        email: username,
        token: token,
        picUuid: idea.picture
      }
    });
    // console.log(await res.data[0].Body.data);
    if (res.data[0]) {
      setRandomIdea({
        ...randomIdea,
        idea: idea,
        ideaPic: convertImg(res.data[0].Body.data)
      });
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setRandomIdea({});
    setFilteredIdeas({});
  };

  if (!signedInUser) {
    return <Preloader />;
  } else {
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
            getCompletedIdeas={getCompletedIdeas}
          />
        </Modal>
      </div>
    );
  }
};

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

export default MasonJar;
