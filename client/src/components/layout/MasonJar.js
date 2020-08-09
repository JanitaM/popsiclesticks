import React, { useEffect } from 'react';
import masonJar from '../../assets/masonJar.png';
import './MasonJar.css';
import DisplayRandomIdea from '../ideas/DisplayRandomIdea';
import EditIdeaModal from '../ideas/EditIdeaModal';
import axios from 'axios';
import { Auth } from 'aws-amplify';

const MasonJar = () => {
  const getRandomIdea = async (e) => {
    e.preventDefault();
    console.log('random idea');

    const fullInfo = await Auth.currentAuthenticatedUser();
    const token = await fullInfo.signInUserSession.idToken.jwtToken;
    const username = await fullInfo.username;

    console.log(fullInfo);
    try {
      if (fullInfo) {
        const res = await axios({
          method: 'get',
          url: `http://localhost:4000/ideas`,
          params: {
            email: username,
            token: token
          }
        });
        console.log(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='main-container'>
      <div className='img-container'>
        <div className='sticks-container'>
          <button onClick={getRandomIdea} className='btn1 btn'></button>
          <button onClick={getRandomIdea} className='btn2 btn'></button>
          <button onClick={getRandomIdea} className='btn3 btn'></button>
          <button onClick={getRandomIdea} className='btn4 btn'></button>
          <button onClick={getRandomIdea} className='btn5 btn'></button>
        </div>
        <div className='jar-container'>
          <img src={masonJar} alt='mason-jar' className='jar-img' />
        </div>
      </div>
    </div>
  );
};

export default MasonJar;
