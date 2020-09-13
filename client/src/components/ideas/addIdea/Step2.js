import React, { useState } from 'react';
import { Divider, makeStyles, TextField } from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

const Step2 = ({ ideaForm, setIdeaForm }) => {
  const classes = useStyles();

  const [cost, setCost] = useState('');
  const handleCost = (e, newCost) => {
    setIdeaForm({ ...ideaForm, cost: newCost });
  };

  const [indoorOutdoor, setIndoorOutdoor] = useState('');
  const handleIndoorOutdoor = (e, newIndoorOutdoor) => {
    setIdeaForm({ ...ideaForm, indoorOutdoor: newIndoorOutdoor });
  };

  const [weather, setWeather] = useState('');
  const handleWeather = (e, newWeather) => {
    setIdeaForm({ ...ideaForm, weather: newWeather });
  };

  return (
    <div className={classes.container}>
      <form className={classes.formContainer} autoComplete='off'>
        <ToggleButtonGroup
          value={ideaForm.cost}
          exclusive
          onChange={handleCost}
          aria-label='cost'
        >
          <ToggleButton
            value='cheap'
            aria-label='cheap cost'
            className={classes.toggleBtns}
          >
            <img
              src='https://img.icons8.com/dusk/64/000000/cheap-2.png'
              alt='cheap cost'
            />
          </ToggleButton>
          <ToggleButton
            value='average'
            aria-label='average cost'
            className={classes.toggleBtns}
          >
            <img
              src='https://img.icons8.com/dusk/64/000000/average-2.png'
              alt='average cost'
            />
          </ToggleButton>
          <ToggleButton
            value='expensive'
            aria-label='expensive cost'
            className={classes.toggleBtns}
          >
            <img
              src='https://img.icons8.com/dusk/64/000000/expensive.png'
              alt='expenisve cost'
            />
          </ToggleButton>
        </ToggleButtonGroup>
        <Divider className={classes.m1} />
        <ToggleButtonGroup
          value={ideaForm.indoorOutdoor}
          exclusive
          onChange={handleIndoorOutdoor}
          aria-label='indoors or outdoors'
        >
          <ToggleButton
            value='outdoor'
            aria-label='outdoor'
            className={classes.toggleBtns}
          >
            <img
              src='https://img.icons8.com/doodle/48/000000/coniferous-tree.png'
              alt='outdoor'
            />
          </ToggleButton>
          <ToggleButton
            value='indoor'
            aria-label='indoor'
            className={classes.toggleBtns}
          >
            <img
              src='https://img.icons8.com/dusk/64/000000/home.png'
              alt='indoor'
            />
          </ToggleButton>
        </ToggleButtonGroup>
        <Divider className={classes.m1} />
        <ToggleButtonGroup
          value={ideaForm.weather}
          exclusive
          onChange={handleWeather}
          aria-label='weather'
        >
          <ToggleButton
            value='sunny'
            aria-label='sunny'
            className={classes.toggleBtns}
          >
            <img
              src='https://img.icons8.com/dusk/64/000000/summer.png'
              alt='sunny'
            />
          </ToggleButton>
          <ToggleButton
            value='rain'
            aria-label='rain'
            className={classes.toggleBtns}
          >
            <img
              src='https://img.icons8.com/dusk/64/000000/rain.png'
              alt='rain'
            />
          </ToggleButton>
          <ToggleButton
            value='snow'
            aria-label='snow'
            className={classes.toggleBtns}
          >
            <img
              src='https://img.icons8.com/dusk/64/000000/snow-storm.png'
              alt='snow'
            />
          </ToggleButton>
        </ToggleButtonGroup>

        <TextField
          variant='outlined'
          label='Category/tag'
          type='text'
          name='category'
          value={ideaForm.category}
          onChange={(e) =>
            setIdeaForm({ ...ideaForm, category: e.target.value })
          }
          className={classes.textfields}
        />
      </form>
    </div>
  );
};

const useStyles = makeStyles({
  container: {
    textAlign: 'center'
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  m1: {
    margin: '1rem 0'
  },
  toggleBtns: {
    margin: '0 1rem',
    border: 'none'
  },
  textfields: {
    margin: '1rem 0'
  }
});

export default Step2;
