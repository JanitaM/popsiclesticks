import React, { useState } from 'react';
import {
  Button,
  makeStyles,
  Select,
  FormControl,
  InputLabel
} from '@material-ui/core';
import Axios from 'axios';

const FilterModal = ({
  signedInUser,
  handleClose,
  filteredIdeas,
  setFilteredIdeas
}) => {
  const classes = useStyles();
  console.log(filteredIdeas);

  const [filterValues, setFilterValues] = useState({
    cost: '',
    indoor_outdoor: '',
    weather: ''
  });
  console.log(filterValues);

  const handleChange = (event) => {
    setFilterValues({
      ...filterValues,
      [event.target.name]: event.target.value
    });
  };

  const handleApply = async () => {
    if (signedInUser) {
      const token = await signedInUser.signInUserSession.idToken.jwtToken;
      const username = signedInUser.username;

      const res = await Axios({
        method: 'post',
        url: 'http://localhost:4000/filteredIdeas',
        data: {
          email: username,
          token: token,
          data: filterValues
        }
      });
      setFilteredIdeas(res.data.message);
    }

    handleClose();
  };

  return (
    <div className={classes.container}>
      <div className={classes.items}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor='cost'>Cost</InputLabel>
          <Select
            native
            value={filterValues.cost}
            onChange={handleChange}
            inputProps={{
              name: 'cost',
              id: 'cost'
            }}
          >
            <option aria-label='None' value='' />
            <option value='cheap'>Cheap</option>
            <option value='average'>Average</option>
            <option value='expensive'>Expensive</option>
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor='indoor_outdoor'>Location</InputLabel>
          <Select
            native
            value={filterValues.indoorOutdoor}
            onChange={handleChange}
            inputProps={{
              name: 'indoor_outdoor',
              id: 'indoor_outdoor'
            }}
          >
            <option aria-label='None' value='' />
            <option value='indoor'>Indoor</option>
            <option value='outdoor'>Outdoor</option>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor='weather'>Weather</InputLabel>
          <Select
            native
            value={filterValues.weather}
            onChange={handleChange}
            inputProps={{
              name: 'weather',
              id: 'weather'
            }}
          >
            <option aria-label='None' value='' />
            <option value='sunny'>Sunny</option>
            <option value='rain'>Rain</option>
            <option value='snow'>Snow</option>
          </Select>
        </FormControl>
        <Button onClick={handleApply} className={classes.applyBtn}>
          Apply
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
  applyBtn: {
    backgroundColor: '#E75734',
    color: '#fff',
    margin: '2rem',
    '&:hover': {
      backgroundColor: '#CF4F30'
    }
  }
});

export default FilterModal;
