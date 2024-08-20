'use client';

import { Box, Grid } from "@mui/material";
import React from "react";
import TrackItem from "@/app/features/tracks/TrackItem";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { useEffect } from "react";
import { loadTracks } from "@/app/features/tracks/trackSlice";

export default function TrackList() {
  const dispatch = useAppDispatch();
  const {tracks, loading} = useAppSelector(state => state.tracks);
  useEffect(() => {
    dispatch(loadTracks());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Grid container direction="column">
      <Box py={3}>
        {tracks.map(track =>
          <React.Fragment key={track._id}>
            <TrackItem track={track}/>
          </React.Fragment>
        )}
      </Box>
    </Grid>
  );
};