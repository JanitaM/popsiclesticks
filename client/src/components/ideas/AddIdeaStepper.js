import React, { useState } from 'react';
import { Auth, Storage } from 'aws-amplify';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Step1 from './addIdea/Step1';
import Step2 from './addIdea/Step2';
import Step3 from './addIdea/Step3';

function getSteps() {
  return ['Step 1', 'Step 2', 'Step 3'];
}

function getStepContent(step, ideaForm, setIdeaForm) {
  switch (step) {
    case 0:
      return <Step1 ideaForm={ideaForm} setIdeaForm={setIdeaForm} />;
    case 1:
      return <Step2 ideaForm={ideaForm} setIdeaForm={setIdeaForm} />;
    case 2:
      return <Step3 ideaForm={ideaForm} setIdeaForm={setIdeaForm} />;
    default:
      return 'Unknown step';
  }
}

const AddIdeaStepper = ({
  ideaForm,
  setIdeaForm,
  handleClose,
  signedInUser
}) => {
  const classes = useStyles();

  const { username, token } = signedInUser;

  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const renderButton = () => {
    if (activeStep === steps.length - 1) {
      return (
        <Button
          variant='contained'
          color='primary'
          onClick={handleSaveIdea}
          className={classes.btn}
        >
          Save
        </Button>
      );
    } else {
      return (
        <Button
          variant='contained'
          color='primary'
          onClick={handleNext}
          className={classes.btn}
        >
          Next
        </Button>
      );
    }
  };

  const handleSaveIdea = async (e) => {
    e.preventDefault();

    if (ideaForm.title) {
      async function uploadToSql(myUuid) {
        return await axios({
          method: 'post',
          url: `http://localhost:4000/user/idea`,
          data: {
            email: username,
            token: token,
            title: ideaForm.title,
            location: ideaForm.location,
            description: ideaForm.description,
            cost: ideaForm.cost,
            indoor_outdoor: ideaForm.indoorOutdoor,
            category: ideaForm.category,
            url: ideaForm.url,
            picture: myUuid,
            weather: ideaForm.weather,
            isCompleted: false
          },
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }

      try {
        if (signedInUser && ideaForm.picture) {
          const myUuid = uuidv4();
          const type = ideaForm.picture.type.split('/');

          Storage.put(
            `${username}/ideaPictures/${myUuid}.${type[1]}`,
            ideaForm.picture,
            {
              contentType: 'image/*'
            }
          )
            .then((result) => console.log(result))
            .then(() => uploadToSql(myUuid))
            .catch((error) => console.log(error));
        } else {
          if (signedInUser) {
            uploadToSql();
          }
        }

        handleClose();
      } catch (error) {
        console.log(error);
      }
    } else {
      alert('A title is required');
    }

    setIdeaForm({});
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        <Typography className={classes.instructions}>
          {getStepContent(activeStep, ideaForm, setIdeaForm)}
        </Typography>
        <div className={classes.buttons}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            className={classes.btn}
          >
            Back
          </Button>

          {activeStep === steps.length - 1 ? (
            <Button
              variant='contained'
              color='primary'
              onClick={handleSaveIdea}
              className={classes.btn}
            >
              Save
            </Button>
          ) : (
            renderButton()
          )}
        </div>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: '1rem',
    textAlign: 'center'
  },
  buttons: {
    margin: '1rem auto 0'
  },
  btn: {
    margin: '0 1rem'
  }
}));

export default AddIdeaStepper;
