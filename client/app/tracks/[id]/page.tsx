'use client';

import { Box, Breadcrumbs, Button, Card, Container, Grid, TextField, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { useEffect } from "react";
import { loadTrackById } from "@/app/features/tracks/trackSlice";

export default function Page({ params }: { params: { id: string } }) {
  const dispatch = useAppDispatch();
  const id = params.id;
  const {tracks, loading} = useAppSelector((state) => state.tracks);
  console.log(tracks);
  const track = tracks[0];
  useEffect(() => {
    dispatch(loadTrackById(id));
    console.log(tracks)
  }, [dispatch, id]);

  if (loading) return <div>Loading...</div>;

  return (
    <Container maxWidth="lg">
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
        <Typography color="text.primary">Selected track</Typography>
      </Breadcrumbs>
      <Card>
        <Box>
          <Image
            src={`http://localhost:5000/${track.thumbnail}`}
            alt={"Song thumbnail"}
            width={64}
            height={64}
          />
          <div>
            <div>Artist: {track.artist}</div>
            <div>title: {track.title}</div>
            <div>Listens: {track.listens}</div>
          </div>
        </Box>
        <Box>
          <Typography variant="h4">Lyrics</Typography>
          <Box>{track.lyrics}</Box>
        </Box>
      </Card>
      <Grid container className="mt-5">
        <Typography variant="h5">
          Share you opinion about this song
        </Typography>
        <TextField label="Your name" fullWidth variant="outlined"/>
        <TextField label="Your comment..." fullWidth multiline variant="outlined" rows={4}/>
        <Button variant="contained" color="primary" sx={{mt: 1}}>Submit</Button>
      </Grid>
      <div>
        {track.comments.map(comment =>
          <div key={comment._id}>
            <div>Username: {comment.username}</div>
            <div>{comment.text}</div>
          </div>
        )}
      </div>
    </Container>
  );
};