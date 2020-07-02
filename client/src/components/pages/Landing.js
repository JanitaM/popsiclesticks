import React from 'react';
import MasonJar from '../layout/MasonJar';
import FilterIdeas from '../layout/FilterIdeas';
import dummyDB from '../../dummyDB';

const Landing = () => {
  return (
    <div>
      <h1>Find something to do</h1>
      <div style={{ position: 'fixed' }}></div>
      <FilterIdeas />
      <MasonJar />
    </div>
  );
};

export default Landing;
