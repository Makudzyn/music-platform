import Link from "next/link";
import { Breadcrumbs, Button, Card, Container, Grid, Typography } from "@mui/material";
import { Track } from "@/app/lib/defenitions";
import TrackList from "@/app/ui/tracks/TrackList";


export default function Page() {
  const tracks: Track[] = [
    {_id: "1", artist: "Death", title: "Trapped In A Corner", lyrics: "Not added yet", listens: 7281, audio: "audio/eaa2ee4c-3b8b-4798-b6a2-670eca578444.mp3", thumbnail: "/thumbnail/894003a2-4c34-48fc-8ccd-5fd564ba8a24.jpg", comments: []},
    {_id: "2", artist: "Death", title: "Symbolic", lyrics: "Not added yet", listens: 666, audio: "/audio/2da43fbb-dc80-4515-b936-926eddc2653c.mp3", thumbnail: "/thumbnail/b25a10e3-97d0-4361-949b-272f4e87b9f0.jpeg", comments: []},
    {_id: "3", artist: "Death", title: "Crystal Mountain", lyrics: "Not added yet", listens: 4418, audio: "/audio/7f4a1051-621a-4143-bb50-936b975262a3.mp3", thumbnail: "/thumbnail/b25a10e3-97d0-4361-949b-272f4e87b9f0.jpeg", comments: []},
    {_id: "3", artist: "Death", title: "Perennial Quest", lyrics: "Not added yet", listens: 4418, audio: "/audio/9cf72425-fd72-494a-a4d6-778008674da7.mp3", thumbnail: "/thumbnail/b25a10e3-97d0-4361-949b-272f4e87b9f0.jpeg", comments: []}
  ]
  return (
    <Container maxWidth="lg">
      <Container>
        <Breadcrumbs aria-label="breadcrumb" sx={{marginBottom: "10px"}}>
          <Link
            underline="hover"
            color="inherit"
            href="/"
          >
            Home
          </Link>
          <Typography color="text.primary">Tracks</Typography>
        </Breadcrumbs>
      </Container>
      <Container>
        <Grid container>
          <Card sx={{display: "flex", justifyContent: "space-between", width: "100%", padding: "8px 12px", marginBottom: "12px"}}>
            <Typography variant="h2">Track list</Typography>
            <Button>
              <Link href="/tracks/create">
                Upload
              </Link>
            </Button>
          </Card>
          <TrackList tracks={tracks} />
        </Grid>
      </Container>
    </Container>
  );
};