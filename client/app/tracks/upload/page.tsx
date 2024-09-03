'use client';

import { Box, Breadcrumbs, Button, Container, Grid, Typography } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import TrackInfoForm from "@/app/features/upload/TrackInfoForm";
import UploadFilesForm from "@/app/features/upload/UploadFilesForm";
import { uploadTrack } from "@/app/services/tracksService";
import styled from "@emotion/styled";

const StyledContainer = styled(Container)(({ theme }) => ({
  height: "600px",
  maxWidth: "960px",
  margin: "0 auto",
}));

const NavigationBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  marginTop: "16px",
}));

export default function Page() {
  const [activeStep, setActiveStep] = useState(0);
  const [trackInfo, setTrackInfo] = useState({ artist: '', title: '', lyrics: '' });
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [audio, setAudio] = useState<File | null>(null);

  const nextStep = () => setActiveStep(prev => Math.min(prev + 1, 2));
  const prevStep = () => setActiveStep(prev => Math.max(prev - 1, 0));
  console.log("Active Step in Page:", activeStep);
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('artist', trackInfo.artist);
    formData.append('title', trackInfo.title);
    formData.append('lyrics', trackInfo.lyrics);
    if (thumbnail) formData.append('thumbnail', thumbnail);
    if (audio) formData.append('audio', audio);

    await uploadTrack(formData);
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <TrackInfoForm trackInfo={trackInfo} setTrackInfo={setTrackInfo} />;
      case 1:
        return <UploadFilesForm formTitle="Upload thumbnail" accept="image/*" setFile={setThumbnail} />;
      case 2:
        return <UploadFilesForm formTitle="Upload audio" accept="audio/*" setFile={setAudio} />;
      default:
        return <Typography>Unknown step</Typography>;
    }
  };

  return (
    <StyledContainer>
      <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: "10px" }}>
        <Link href="/">Home</Link>
        <Link href="/tracks">Tracks</Link>
        <Typography color="text.primary">Add track</Typography>
      </Breadcrumbs>
      <Grid container direction="column" justifyContent="space-between" style={{ height: "100%" }}>
        {renderStepContent(activeStep)}
      </Grid>
      <NavigationBox>
        <Button disabled={activeStep === 0} onClick={prevStep}>Prev step</Button>
        {activeStep === 2 ? (
          <Button onClick={handleSubmit}>Submit</Button>
        ) : (
          <Button onClick={nextStep}>Next step</Button>
        )}
      </NavigationBox>
    </StyledContainer>
  );
}