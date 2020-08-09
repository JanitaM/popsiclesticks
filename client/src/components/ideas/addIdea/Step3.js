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
      <div>
        <form className={classes.formContainer} autoComplete='off'>
          <div className={classes.uploadContainer}>
            <img
              className={classes.image}
              src={
                ideaForm.convertIdeaPic
                  ? ideaForm.convertIdeaPic
                  : 'https://img.icons8.com/plasticine/100/000000/image.png'
              }
            />
            <Input
              accept='image/*'
              className={classes.uploadInput}
              id='upload-btn'
              multiple
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
    </div>
  );
};

const useStyles = makeStyles({
  container: {
    textAlign: 'center',
    backgroundColor: '#ccc',
    border: '1px solid #333',
    borderRadius: '.5rem',
    maxWidth: '350px',
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

export default Step3;
