import React, { useState, useEffect } from 'react';
import { Storage } from 'aws-amplify';
import {
  Button,
  makeStyles,
  TextField,
  Typography,
  Input
} from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

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
  },
  uploadContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '1rem'
  },
  uploadInput: {
    display: 'none'
  },
  uploadBtn: {
    backgroundColor: '#EC795D',
    marginLeft: '1rem'
  },
  deleteBtn: {
    backgroundColor: 'red',
    marginLeft: '1rem'
  },
  image: {
    textAlign: 'center',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    marginBottom: '1rem',
    width: '15vw'
  }
});

function convertImg(binArr) {
  let arrayBufferView = new Uint8Array(binArr);
  let blob = new Blob([arrayBufferView], { type: 'image/*' });
  let urlCreator = window.url || window.webkitURL;
  let imgUrl = urlCreator.createObjectURL(blob);
  return imgUrl;
}

export default function EditIdeaModal({ ideaToEdit, signedInUser }) {
  // console.log(ideaToEdit);
  // console.log(signedInUser);
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleCost = (e, newCost) => {
    setUpdatedInfo({ ...updatedInfo, cost: newCost });
  };
  const handleIndoorOutdoor = (e, newIndoorOutdoor) => {
    setUpdatedInfo({ ...updatedInfo, indoor_outdoor: newIndoorOutdoor });
  };
  const handleWeather = (e, newWeather) => {
    setUpdatedInfo({ ...updatedInfo, weather: newWeather });
  };

  const [updatedInfo, setUpdatedInfo] = useState({
    id: '',
    title: '',
    location: '',
    description: '',
    cost: '',
    indoor_outdoor: '',
    category: '',
    url: '',
    picture: undefined,
    convertIdeaPic: '',
    weather: '',
    isCompleted: false
  });
  // console.log(updatedInfo);

  const {
    id,
    title,
    location,
    description,
    cost,
    indoor_outdoor,
    category,
    url,
    picture,
    convertIdeaPic,
    weather,
    isCompleted
  } = updatedInfo;

  useEffect(() => {
    if (ideaToEdit) setUpdatedInfo(ideaToEdit);
  }, [ideaToEdit]);

  const onChange = (e) => {
    e.preventDefault();
    setUpdatedInfo({ ...updatedInfo, [e.target.name]: e.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (value) => {
    setOpen(false);
  };

  const getIdeaPic = async (picture) => {
    // console.log(picture);
    const res = await axios({
      method: 'post',
      url: 'http://localhost:4000/idea/pic',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        email: signedInUser.email,
        token: signedInUser.token,
        picUuid: picture
      }
    });

    let response = await res.data[0];
    // console.log(response);
    if (response) {
      setUpdatedInfo({
        ...updatedInfo,
        picture: convertImg(response.Body.data)
      });
    }
  };
  getIdeaPic(picture);

  const handlePicture = (e) => {
    setUpdatedInfo({
      ...updatedInfo,
      convertIdeaPic: URL.createObjectURL(e.target.files[0]),
      picture: e.target.files[0]
    });
  };

  const updateIdea = (e) => {
    e.preventDefault();
    console.log('update idea');
    // console.log(updatedInfo);
    // console.log(signedInUser);

    if (updatedInfo.title) {
      async function uploadToSql(myUuid) {
        return await axios({
          method: 'put',
          url: `http://localhost:4000/user/idea`,
          data: {
            email: signedInUser.email,
            token: signedInUser.token,
            id: updatedInfo.id,
            title: updatedInfo.title,
            location: updatedInfo.location,
            description: updatedInfo.description,
            cost: updatedInfo.cost,
            indoor_outdoor: updatedInfo.indoor_outdoor,
            category: updatedInfo.category,
            url: updatedInfo.url,
            picture: updatedInfo.myUuid,
            weather: updatedInfo.weather,
            isCompleted: false
          },
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }

      try {
        if (signedInUser && updatedInfo.picture) {
          const myUuid = uuidv4();
          const type = updatedInfo.picture.type.split('/');

          Storage.put(
            `${signedInUser.email}/ideaPictures/${myUuid}.${type[1]}`,
            updatedInfo.picture,
            {
              contentType: 'image/*'
            }
          )
            .then((result) => console.log(result))
            .then(() => uploadToSql(myUuid))
            .then(() => handleClose())
            .catch((error) => console.log(error));
        } else {
          if (signedInUser) {
            uploadToSql();
            handleClose();
          }
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert('A title is required');
    }
  };

  const renderPic = () => {
    // console.log('picture', picture);
    // console.log('convertIdeaPic', convertIdeaPic);

    if (convertIdeaPic) {
      return convertIdeaPic;
    } else if (picture) {
      return picture;
    } else {
      return 'https://img.icons8.com/plasticine/100/000000/image.png';
    }
  };

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

        <ToggleButtonGroup
          value={cost}
          name='cost'
          exclusive
          onChange={handleCost}
          aria-label='cost'
        >
          <ToggleButton value='cheap' aria-label='cheap cost'>
            <img
              src='https://img.icons8.com/dusk/64/000000/cheap-2.png'
              alt='cheap cost'
            />
          </ToggleButton>
          <ToggleButton value='average' aria-label='average cost'>
            <img
              src='https://img.icons8.com/dusk/64/000000/average-2.png'
              alt='average cost'
            />
          </ToggleButton>
          <ToggleButton value='expensive' aria-label='expensive cost'>
            <img
              src='https://img.icons8.com/dusk/64/000000/expensive.png'
              alt='expenisve cost'
            />
          </ToggleButton>
        </ToggleButtonGroup>

        <ToggleButtonGroup
          name='indoor_outdoor'
          value={indoor_outdoor}
          exclusive
          onChange={handleIndoorOutdoor}
          aria-label='indoors or outdoors'
        >
          <ToggleButton value='outdoor' aria-label='outdoor'>
            <img
              src='https://img.icons8.com/doodle/48/000000/coniferous-tree.png'
              alt='outdoor'
            />
          </ToggleButton>
          <ToggleButton value='indoor' aria-label='indoor'>
            <img
              src='https://img.icons8.com/dusk/64/000000/home.png'
              alt='indoor'
            />
          </ToggleButton>
        </ToggleButtonGroup>

        <ToggleButtonGroup
          name='weather'
          value={weather}
          exclusive
          onChange={handleWeather}
          aria-label='weather'
        >
          <ToggleButton value='sunny' aria-label='sunny'>
            <img
              src='https://img.icons8.com/dusk/64/000000/summer.png'
              alt='sunny'
            />
          </ToggleButton>
          <ToggleButton value='rain' aria-label='rain'>
            <img
              src='https://img.icons8.com/dusk/64/000000/rain.png'
              alt='rain'
            />
          </ToggleButton>
          <ToggleButton value='snow' aria-label='snow'>
            <img
              src='https://img.icons8.com/dusk/64/000000/snow-storm.png'
              alt='snow'
            />
          </ToggleButton>
        </ToggleButtonGroup>
        <TextField
          variant='outlined'
          label='Give it a category/tag'
          type='text'
          name='category'
          value={category}
          onChange={onChange}
          className={classes.m1}
        />

        <div className={classes.uploadContainer}>
          <img
            className={classes.image}
            src={renderPic()}
            alt='user profile picture'
          />
          <Input
            accept='image/*'
            className={classes.uploadInput}
            id='upload-btn'
            multiple
            type='file'
            name='picture'
            label='picture'
            onChange={(e) => handlePicture(e)}
          />
          <label htmlFor='upload-btn'>
            <Button
              variant='contained'
              className={classes.uploadBtn}
              component='span'
              startIcon={<PhotoCamera />}
            >
              Upload New Picture
            </Button>
            <Button
              variant='contained'
              className={classes.deleteBtn}
              component='span'
              startIcon={<PhotoCamera />}
            >
              Delete Picture
            </Button>
          </label>
        </div>
      </form>
      <div>
        <Button variant='outlined' color='primary' onClick={updateIdea}>
          Update Idea
        </Button>
        <Button variant='outlined' color='primary' onClick={updateIdea}>
          Delete Idea
        </Button>
      </div>
    </div>
  );
}
