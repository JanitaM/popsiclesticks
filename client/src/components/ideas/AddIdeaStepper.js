import React, { useState } from 'react';
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

const AddIdeaStepper = ({ ideaForm, setIdeaForm }) => {
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
  // change to handleClose
  const handleReset = () => {
    setActiveStep(0);
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

  const handleSaveIdea = () => console.log('save idea');

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
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              Idea added to the jar
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
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
        )}
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
