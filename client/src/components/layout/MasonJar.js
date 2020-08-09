import React, { useEffect } from 'react';
import masonJar from '../../assets/masonJar.png';
import './MasonJar.css';
import DisplayRandomIdea from '../ideas/DisplayRandomIdea';
import EditIdeaModal from '../ideas/EditIdeaModal';
import axios from 'axios';
import { Auth } from 'aws-amplify';

const MasonJar = () => {
  const getUserIdeas = async (e) => {
    e.preventDefault();

    const fullInfo = await Auth.currentAuthenticatedUser();
    const token = await fullInfo.signInUserSession.idToken.jwtToken;
    const username = await fullInfo.username;

    try {
      if (fullInfo) {
        const res = await axios({
          method: 'get',
          url: `http://localhost:4000/user/ideas`,
          params: {
            email: username,
            token: token
          }
        });
        // console.log(res.data.message);
        getRandomIdea(res.data.message);
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
    </div>
  );
};

export default MasonJar;
