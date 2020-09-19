import React from 'react';
import { Button, makeStyles, Input } from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const Step3 = ({ ideaForm, setIdeaForm }) => {
  const classes = useStyles();

  const onChange = (e) => {
    setIdeaForm({
      ...ideaForm,
      convertIdeaPic: URL.createObjectURL(e.target.files[0]),
      picture: e.target.files[0]
    });
  };

  return (
    <div className={classes.container}>
      <form className={classes.formContainer} autoComplete='off'>
        <div className={classes.uploadContainer}>
          <img
            className={classes.image}
            src={
              ideaForm.convertIdeaPic
                ? ideaForm.convertIdeaPic
                : 'https://img.icons8.com/plasticine/100/000000/image.png'
            }
            alt='user profile'
          />
          <Input
            accept='image/*'
            className={classes.uploadInput}
            id='upload-btn'
            type='file'
            name='picture'
            label='picture'
            onChange={(e) => onChange(e)}
          />
          <label htmlFor='upload-btn'>
            <Button
              variant='contained'
              className={classes.uploadBtn}
              component='span'
              startIcon={<PhotoCamera />}
            >
              Upload
            </Button>
          </label>
        </div>
      </form>
    </div>
  );
};

const useStyles = makeStyles({
  container: {
    textAlign: 'center',
    border: '1px solid #333',
    borderRadius: '4px'
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
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
    backgroundColor: '#fff',
    border: '2px solid #E75734',
    color: '#000',
    '&:hover': {
      backgroundColor: '#fff',
      border: '2px solid #CF4F30'
    }
  },
  image: {
    textAlign: 'center',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    margin: '1rem 0',
    maxWidth: '50%'
  }
});

export default Step3;
