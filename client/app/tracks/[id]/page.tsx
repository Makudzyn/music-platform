import { Box, Breadcrumbs, Button, Card, Container, Grid, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { Track } from "@/app/lib/defenitions";
import Image from "next/image";

export default function Page() {
  const track: Track = {
    _id: "1",
    artist: "Death",
    title: "Trapped In A Corner",
    lyrics: "Not added yet",
    listens: 7281,
    audio: "audio/eaa2ee4c-3b8b-4798-b6a2-670eca578444.mp3",
    thumbnail: "/thumbnail/894003a2-4c34-48fc-8ccd-5fd564ba8a24.jpg",
    comments: []
  }
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
          <Image src={track.thumbnail} alt={"Song thumbnail"} width={64} height={64}/>
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