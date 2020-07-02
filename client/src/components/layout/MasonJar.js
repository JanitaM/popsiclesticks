import React, { useState, useEffect } from 'react';
import masonJar from '../../assets/masonJar.png';
import './MasonJar.css';
import dummyDB from '../../dummyDB';

const MasonJar = () => {
  return (
    <div className='main-container'>
      <div className='img-container'>
        <div className='sticks-container'>
          <button className='btn1 btn'></button>
          <button className='btn2 btn'></button>
          <button className='btn3 btn'></button>
          <button className='btn4 btn'></button>
          <button className='btn5 btn'></button>
        </div>
        <div className='jar-container'>
          <img src={masonJar} alt='mason-jar' className='jar-img' />
          <h3 className='jar-label'>{5} ideas in the jar</h3>
        </div>
      </div>
    </div>
  );
};

export default MasonJar;
