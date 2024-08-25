'use client';

import { Box, Grid } from "@mui/material";
import React from "react";
import TrackItem from "@/app/features/tracks/TrackItem";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { useEffect } from "react";
import { loadTracks } from "@/app/features/tracks/trackSlice";
import { setQueue } from "@/app/features/player/playerSlice";

export default function TrackList() {
  const dispatch = useAppDispatch();
  const {tracks, loading} = useAppSelector(state => state.tracks);
  useEffect(() => {
    dispatch(loadTracks());
  }, []);

  useEffect(() => {
    if (tracks.length > 0) {
      dispatch(setQueue(tracks));
    }
  }, [tracks]);

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