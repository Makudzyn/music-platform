'use client';

import { Box, Breadcrumbs, Button, Container, Grid, Typography } from "@mui/material";
import Link from "next/link";


export default function Page() {

  return (
    <Container maxWidth="lg" sx={{height: "calc(100vh-36px)"}}>
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
        <Typography color="text.primary">
          {activeStep === 1 && <div>Step 1</div>}
          {activeStep === 2 && <div>Step 2</div>}
          {activeStep === 3 && <div>Step 3</div>}
        </Typography>
      </Grid>
    </Container>
  );
};