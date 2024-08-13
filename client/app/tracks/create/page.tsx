'use client';

import { Box, Breadcrumbs, Button, Container, Grid, Typography } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import TrackInfoForm from "@/app/ui/tracks/upload/TrackInfoForm";
import UploadFilesForm from "@/app/ui/tracks/upload/UploadFilesForm";


export default function Page() {
  const [activeStep, setActiveStep] = useState(0);
  const [thumbnail, setThumbnail] = useState(null);
  const [audio, setAudio] = useState(null);
  const nextStep = () => {
    setActiveStep((prev) => Math.min(prev + 1, 2));
  };

  const prevStep = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <TrackInfoForm />;
      case 1:
        return <UploadFilesForm formTitle={"Upload thumbnail"} accept={"image/*"} setFile={setThumbnail}/>;
      case 2:
        return <UploadFilesForm formTitle={"Upload audio"} accept={"audio/*"} setFile={setAudio}/>;
      default:
        return <Typography>Unknown step</Typography>;
    }
  };

  return (
    <Container maxWidth="lg" sx={{height: "600px"}}>
      <Breadcrumbs aria-label="breadcrumb" sx={{marginBottom: "10px"}}>
        <Link
          underline="hover"
          color="inherit"
          href="/"
        >
          Home
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/tracks"
        >
          Tracks
        </Link>
        <Typography color="text.primary">Add track</Typography>
      </Breadcrumbs>
      <Grid sx={{display: "flex", height: "100%", justifyContent: "space-between", flexDirection: "column"}}>
        {renderStepContent(activeStep)}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
        <Button disabled={activeStep === 0} onClick={prevStep}>
          Prev step
        </Button>
        <Button disabled={activeStep === 2} onClick={nextStep}>
          Next step
        </Button>
      </Box>
    </Container>
  );
};