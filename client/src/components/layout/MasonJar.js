import React from 'react';
import masonJar from '../../assets/masonJar.png';
import './MasonJar.css';
import DisplayRandomIdea from '../ideas/DisplayRandomIdea';
import EditIdeaModal from '../ideas/EditIdeaModal';

const MasonJar = () => {
  const getRandomIdea = () => {
    // console.log('random idea');
    // return <DisplayRandomIdea />;
    return <EditIdeaModal />;
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
