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

const AddIdeaStepper = ({ ideaForm, setIdeaForm, handleClose }) => {
  const classes = useStyles();
  console.log('ideaForm', ideaForm);

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
        <Button variant='contained' color='primary' onClick={handleSaveIdea}>
          Save
        </Button>
      );
    } else {
      return (
        <Button variant='contained' color='primary' onClick={handleNext}>
          Next
        </Button>
      );
    }
  };

  const handleSaveIdea = async (e) => {
    e.preventDefault();

    if (ideaForm.title) {
      const fullInfo = await Auth.currentAuthenticatedUser();
      const token = await fullInfo.signInUserSession.idToken.jwtToken;
      const username = await fullInfo.username;

      async function uploadToSql(myUuid) {
        return await axios({
          method: 'post',
          // url: 'https://ds7m4gu0n5.execute-api.us-east-2.amazonaws.com/dev/idea',
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
        if (fullInfo && ideaForm.picture) {
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
            .then(() => handleClose())
            .catch((error) => console.log(error));
        } else {
          if (fullInfo) {
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
        <div>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            className={classes.backButton}
          >
            Back
          </Button>

          {activeStep === steps.length - 1 ? (
            <Button
              variant='contained'
              color='primary'
              onClick={handleSaveIdea}
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
    width: '100%'
  },
  button: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

export default AddIdeaStepper;
