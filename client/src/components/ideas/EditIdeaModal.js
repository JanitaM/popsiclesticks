import React, { useState, useEffect } from 'react';
import { Storage } from 'aws-amplify';
import {
  Button,
  FormGroup,
  FormControlLabel,
  makeStyles,
  TextField,
  Typography,
  Input,
  Divider,
  Switch,
  withStyles
} from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import Preloader from '../layout/Preloader';

function convertImg(binArr) {
  let arrayBufferView = new Uint8Array(binArr);
  let blob = new Blob([arrayBufferView], { type: 'image/*' });
  let urlCreator = window.url || window.webkitURL;
  let imgUrl = urlCreator.createObjectURL(blob);
  return imgUrl;
}

const CustomSwitch = withStyles({
  switchBase: {
    color: '#E8471E',
    '&$checked': {
      color: '#A83316'
    },
    '&$checked + $track': {
      backgroundColor: '#A83316'
    }
  },
  checked: {},
  track: {}
})(Switch);

const EditIdeaModal = ({
  ideaToEdit,
  setIdeaToEdit,
  signedInUser,
  handleClose
}) => {
  console.log('ideaToEdit', ideaToEdit);
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

  const [completed, setCompleted] = useState(false);
  const handleCompleted = (event) => {
    setCompleted(!completed);
  };
  console.log(completed);

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
    weather: ''
  });
  console.log('updatedInfo', updatedInfo);

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
    weather
  } = updatedInfo;

  useEffect(() => {
    (async () => {
      const res = await axios({
        method: 'post',
        url: 'http://localhost:4000/idea/pic',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          email: signedInUser.username,
          token: signedInUser.token,
          picUuid: ideaToEdit.picture
        }
      });

      let response = await res.data[0];
      // console.log(response);
      if (response) {
        setIdeaToEdit({
          ...ideaToEdit,
          picture: convertImg(response.Body.data) //set to oldPicture to preserve uuid of old picture?
        });
      }
    })();

    setUpdatedInfo(ideaToEdit);
  }, []);

  const onChange = (e) => {
    e.preventDefault();
    setUpdatedInfo({ ...updatedInfo, [e.target.name]: e.target.value });
  };

  const renderPic = () => {
    if (ideaToEdit.picture && !convertIdeaPic) {
      //ideaToEdit.oldPicture?
      return ideaToEdit.picture;
    }
    if (convertIdeaPic) {
      return convertIdeaPic;
    }
    if (!ideaToEdit.picture && !convertIdeaPic) {
      return 'https://img.icons8.com/plasticine/100/000000/image.png';
    }
  };

  const handleNewPicture = (e) => {
    setUpdatedInfo({
      ...updatedInfo,
      convertIdeaPic: URL.createObjectURL(e.target.files[0]),
      picture: e.target.files[0]
    });
    renderPic();
  };

  const deleteIdeaPictureFromUI = (e) => {
    setUpdatedInfo({ ...updatedInfo, convertIdeaPic: '', picture: undefined });
    setIdeaToEdit({ ...ideaToEdit, picture: undefined });
    renderPic();
  };
  // Delete Idea Pic from S3
  {
    /* https://docs.amplify.aws/lib/storage/remove/q/platform/js */
  }

  const handleUpdateIdea = (e) => {
    e.preventDefault();
    console.log('update idea');
    console.log(typeof updatedInfo.picture);
    console.log(typeof ideaToEdit.picture);

    if (updatedInfo.title) {
      async function uploadToSql(myUuid) {
        return await axios({
          method: 'patch',
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
            picture: updatedInfo.myUuid, //set this to undefined if type is string, else updatedInfo.myUuid
            weather: updatedInfo.weather
          },
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }

      try {
        if (signedInUser && typeof updatedInfo.picture === 'string') {
          console.log('you have the old pic'); //old pic is still not a match with new pic
          //       uploadToSql();
          //       handleClose();
        } else if (signedInUser && typeof updatedInfo.picture === 'object') {
          console.log('you have a new pic'); //update everything
          //       const myUuid = uuidv4();
          //       const type = updatedInfo.picture.type.split('/'); //when there is an old picture (uuid), this fails

          //       Storage.put(
          //         `${signedInUser.username}/ideaPictures/${myUuid}.${type[1]}`,
          //         updatedInfo.picture,
          //         {
          //           contentType: 'image/*'
          //         }
          //       )
          //         .then((result) => console.log(result))
          //         .then(() => uploadToSql(myUuid))
          //         .then(() => handleClose())
          //         .catch((error) => console.log(error));
        } else if (signedInUser && typeof updatedInfo.picture === 'undefined') {
          console.log('picture was deleted'); //need to remove from S3 storage and update idea. picture will be undefined/null
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert('A title is required');
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const res = await axios({
        method: 'delete',
        url: `http://localhost:4000/user/idea`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          email: signedInUser.username,
          token: signedInUser.token,
          id: ideaToEdit.id
        }
      });
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.container}>
      <Typography variant='h4' component='h1' className={classes.title}>
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
          className={classes.m1}
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
        <Divider />
        <ToggleButtonGroup
          name='indoor_outdoor'
          value={indoor_outdoor}
          exclusive
          onChange={handleIndoorOutdoor}
          aria-label='indoors or outdoors'
          className={classes.m1}
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
        <Divider />
        <ToggleButtonGroup
          name='weather'
          value={weather}
          exclusive
          onChange={handleWeather}
          aria-label='weather'
          className={classes.m1}
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
          value={category}
          onChange={onChange}
          className={classes.m1}
        />
        <div className={classes.imageContainer}>
          <img className={classes.image} src={renderPic()} alt='idea picture' />
          <div className={classes.imageBtnContainer}>
            <Input
              accept='image/*'
              className={classes.uploadInput}
              id='upload-btn'
              multiple
              type='file'
              name='picture'
              label='picture'
              onChange={(e) => handleNewPicture(e)}
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
            </label>
            <Button
              variant='contained'
              className={classes.deleteBtn}
              component='span'
              startIcon={<PhotoCamera />}
              onClick={deleteIdeaPictureFromUI}
            >
              Delete Picture
            </Button>
          </div>
        </div>
        <Divider />
        <div className={classes.completed}>
          <FormGroup row>
            <FormControlLabel
              control={
                <CustomSwitch
                  checked={completed}
                  onChange={handleCompleted}
                  name='completed'
                  size='normal'
                  color='primary'
                />
              }
              label='Completed'
            />
          </FormGroup>
        </div>
      </form>
      <Divider />
      <div className={classes.updateDeleteBtns}>
        <Button
          variant='outlined'
          color='primary'
          onClick={handleUpdateIdea}
          className={classes.updateIdeaBtn}
        >
          Update Idea
        </Button>
        <Button
          variant='outlined'
          color='primary'
          onClick={handleDelete}
          className={classes.deleteIdeaBtn}
        >
          Delete Idea
        </Button>
      </div>
    </div>
  );
};

const useStyles = makeStyles({
  container: {
    textAlign: 'center',
    minWidth: '600px',
    width: '100%',
    margin: '0 auto'
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  m1: {
    margin: '1rem'
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageBtnContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '1rem 2rem'
  },
  uploadInput: {
    display: 'none'
  },
  uploadBtn: {
    backgroundColor: '#fff',
    border: '2px solid #E75734',
    color: '#000',
    '&:hover': {
      backgroundColor: '#fff',
      border: '2px solid #CF4F30'
    }
  },
  deleteBtn: {
    backgroundColor: '#fff',
    border: '2px solid #65B5B4',
    color: '#000',
    margin: '1rem',
    '&:hover': {
      backgroundColor: '#fff',
      border: '2px solid #737373'
    }
  },
  image: {
    textAlign: 'center',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    marginBottom: '1rem',
    width: '15vw'
  },
  title: {
    margin: '1rem 0'
  },
  toggleBtns: {
    margin: '0 1rem',
    border: 'none'
  },
  updateDeleteBtns: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    margin: '1rem auto'
  },
  deleteIdeaBtn: {
    backgroundColor: '#8C8C8C',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#737373'
    }
  },
  updateIdeaBtn: {
    backgroundColor: '#A83316',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#8F2B13'
    }
  },
  completed: {
    margin: '1rem auto'
  }
});

export default EditIdeaModal;
