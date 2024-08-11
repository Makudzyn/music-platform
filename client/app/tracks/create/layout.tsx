'use client';

import { Box, Button, Card, Container, Grid, Step, StepLabel, Stepper } from "@mui/material";
import { ReactNode, useState } from "react";

const steps = ["Track info", "Upload thumbnail", "Upload audio"];


export default function Layout({children}: {children: ReactNode}) {
  const [activeStep, setActiveStep] = useState(0);

  const nextStep = () => {
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };
  return (
    <Container>
      <Stepper activeStep={activeStep}>
        {steps.map((step, i) => (
          <Step key={i} completed={activeStep > i}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid container sx={{justifyContent: "center", margin: "50px 0", height: "600px"}}>
        <Card style={{width: 1000}}>
          {children}
        </Card>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
        <Button disabled={activeStep === 0} onClick={prevStep}>
          Prev step
        </Button>
        <Button disabled={activeStep === steps.length - 1} onClick={nextStep}>
          Next step
        </Button>
      </Box>
    </Container>
  );
};