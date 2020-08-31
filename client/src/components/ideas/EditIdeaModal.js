import React, { useState, useEffect } from 'react';
import { Button, makeStyles, TextField, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    textAlign: 'center',
    backgroundColor: '#ccc',
    minWidth: '700px',
    margin: '2rem auto'
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  m1: {
    margin: '1rem'
  }
});

export default function EditIdeaModal({ ideaToEdit }) {
  // console.log(ideaToEdit);
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const [updatedInfo, setUpdatedInfo] = useState({
    title: '',
    location: '',
    description: '',
    cost: '',
    indoorOutdoor: '',
    category: '',
    url: '',
    picture: undefined,
    convertIdeaPic: '',
    weather: '',
    isCompleted: false
  });
  console.log(updatedInfo);

  const {
    title,
    location,
    description,
    cost,
    indoorOutdoor,
    cateogry,
    url,
    picture,
    convertIdeaPic,
    weather,
    isCompleted
  } = updatedInfo;

  const onChange = (e) => {
    setUpdatedInfo({ ...updatedInfo, [e.target.name]: e.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  useEffect(() => {
    if (ideaToEdit !== null) {
      setUpdatedInfo(ideaToEdit);
    } else {
      setUpdatedInfo({
        title: '',
        location: '',
        description: '',
        cost: '',
        indoorOutdoor: '',
        category: '',
        url: '',
        picture: undefined,
        convertIdeaPic: '',
        weather: '',
        isCompleted: false
      });
    }
  }, [ideaToEdit]);

  return (
    <div className={classes.container}>
      <Typography variant='h5' component='h1' gutterBottom>
        Update This Idea
      </Typography>
      <form className={classes.formContainer} autoComplete='off'>
        <TextField
          required
          variant='outlined'
          label='Title'
          type='text'
          name='title'
          value={title}
          onChange={onChange}
          className={classes.m1}
        />
        <TextField
          variant='outlined'
          label='Location'
          type='text'
          name='location'
          value={location}
          onChange={onChange}
          className={classes.m1}
        />
        <TextField
          variant='outlined'
          label='Description'
          type='text'
          name='description'
          value={description}
          onChange={onChange}
          className={classes.m1}
        />
        <TextField
          variant='outlined'
          label='URL'
          type='url'
          name='url'
          value={url}
          onChange={onChange}
          className={classes.m1}
        />
      </form>
    </div>
    // <div>
    //   <Typography variant='subtitle1'>Selected: {selectedValue}</Typography>
    //   <br />
    //   <Button variant='outlined' color='primary' onClick={handleClickOpen}>
    //     Open simple dialog
    //   </Button>
    //   <SimpleDialog
    //     selectedValue={selectedValue}
    //     open={open}
    //     onClose={handleClose}
    //   />
    // </div>
  );
}
