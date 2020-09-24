import React, { useState, useEffect } from 'react';
import {
  Button,
  makeStyles,
  Select,
  FormControl,
  InputLabel
} from '@material-ui/core';

const FilterModal = ({ handleClose }) => {
  const classes = useStyles();

  const handleSearch = () => {
    handleClose();
  };

  return (
    <div className={classes.container}>
      <div className={classes.items}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor='age-native-simple'>Cost</InputLabel>
          <Select
            native
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            // value={cost}
            // onChange={handleChange}
          >
            <option aria-label='None' value='' />
            {/* map through database and list options */}
            <option value={10}>Ten</option>
            <option value={20}>Twenty</option>
            <option value={30}>Thirty</option>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor='age-native-simple'>Location</InputLabel>
          <Select
            native
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            // value={indoorOutdoor}
            // onChange={handleChange}
          >
            <option aria-label='None' value='' />
            {/* map through database and list options */}
            <option value={10}>Ten</option>
            <option value={20}>Twenty</option>
            <option value={30}>Thirty</option>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor='age-native-simple'>Weather</InputLabel>
          <Select
            native
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            // value={weather}
            // onChange={handleChange}
          >
            <option aria-label='None' value='' />
            {/* map through database and list options */}
            <option value={10}>Ten</option>
            <option value={20}>Twenty</option>
            <option value={30}>Thirty</option>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor='age-native-simple'>Category</InputLabel>
          <Select
            native
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            // value={category}
            // onChange={handleChange}
          >
            <option aria-label='None' value='' />
            {/* map through database and list options */}
            <option value={10}>Ten</option>
            <option value={20}>Twenty</option>
            <option value={30}>Thirty</option>
          </Select>
        </FormControl>
        <Button onClick={handleSearch} className={classes.searchBtn}>
          Search
        </Button>
      </div>
    </div>
  );
};

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  items: {
    margin: '1rem'
  },
  formControl: {
    margin: '1rem 2rem',
    minWidth: 120
  },
  selectEmpty: {
    marginTop: '2rem'
  },
  searchBtn: {
    backgroundColor: '#E75734',
    color: '#fff',
    margin: '2rem',
    '&:hover': {
      backgroundColor: '#CF4F30'
    }
  }
});

export default FilterModal;
