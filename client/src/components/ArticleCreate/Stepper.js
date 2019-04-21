import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Stepper, Step, StepLabel, Button, Typography } from '@material-ui/core';
import { withSnackbar, useSnackbar } from 'notistack';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';

const StepsContainer = styled.div`
  padding-top: 150px;
  max-width: 700px;
  margin: 0 auto;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 80px 0 50px 0;
`;

const BackButton = styled(Button)`
  margin-right: 20px !important;
`;

function getSteps() {
  return ['Title & description', 'Upload file', 'Upload image'];
}

const CustomStepper = (props) => {
  const [activeStep, setActiveStep] = useState(0);
  const handleBack = () => setActiveStep(activeStep - 1);
  const steps = getSteps();
  const childRef = useRef();
  const handleNext = () => setActiveStep(activeStep + 1);
  const { enqueueSnackbar } = useSnackbar();
  const showError = (message) => enqueueSnackbar(message, { variant: 'error' });
  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return {
          title: 'Choose title and description',
          component: <FirstStep
            setDescription={props.setDescription}
            setTitle={props.setTitle}
            handleNext={handleNext}
            ref={childRef}
            showError={showError}
          />
        };
      case 1:
        return {
          title: 'Upload file',
          component: <SecondStep
            setFile={props.setFile}
            handleNext={handleNext}
            ref={childRef}
            showError={showError}
          />
        };
      case 2:
        return { 
          title: 'Upload image', 
          component: <ThirdStep 
            setImage={props.setImage}
            handleNext={props.onSubmit}
            ref={childRef}
            showError={showError}
          /> 
        };
      default:
        return { title: 'Unknown stepIndex', component: 'Not found' };
    }
  }

  return (
    <StepsContainer>
      <Typography variant='h4' align='center'>{getStepContent(activeStep).title.toUpperCase()}</Typography>
      <ContentContainer>{getStepContent(activeStep).component}</ContentContainer>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        <div>
          <ButtonContainer>
            <BackButton
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Back
            </BackButton>
            <Button variant="contained" color="primary" onClick={() => childRef.current.checkFields()}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </ButtonContainer>
        </div>
      </div>
    </StepsContainer>
  );
}

export default withSnackbar(CustomStepper);