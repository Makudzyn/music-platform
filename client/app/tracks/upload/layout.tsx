import { Container, Step, StepLabel, Stepper } from "@mui/material";
import { ReactNode, useEffect } from "react";

const steps = ["Track info", "Upload thumbnail", "Upload audio"];

interface LayoutProps {
  activeStep: number,
  children: ReactNode,
}

export default function Layout({activeStep, children}: LayoutProps) {

  return (
    <div className={"max-w-screen-lg h-full"}>
      {/*<Stepper activeStep={activeStep}>*/}
      {/*  {steps.map((step, i) => (*/}
      {/*    <Step key={i} completed={activeStep > i}>*/}
      {/*      <StepLabel>{step}</StepLabel>*/}
      {/*    </Step>*/}
      {/*  ))}*/}
      {/*</Stepper>*/}
      <div className={"max-w-screen-lg flex items-center justify-center my-14 mx-1.5 py-2.5 px-1.5 h-full w-full"}>
        {children}
      </div>
    </div>
  );
};