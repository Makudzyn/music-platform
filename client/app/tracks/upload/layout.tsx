import { Container, Step, StepLabel, Stepper } from "@mui/material";
import { ReactNode, useEffect } from "react";

const steps = ["Track info", "Upload thumbnail", "Upload audio"];

interface LayoutProps {
  activeStep: number,
  children: ReactNode,
}

export default function Layout({activeStep, children}: LayoutProps) {
  console.log("Active step", activeStep);
  return (
    <Container maxWidth="lg" sx={{height: "100%"}}>
      <Stepper activeStep={activeStep}>
        {steps.map((step, i) => (
          <Step key={i} completed={activeStep > i}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "60px 5px",
          padding: "10px 5px",
          height: "100%",
          width: "100%"
        }}>

        {children}
      </Container>
    </Container>
  );
};