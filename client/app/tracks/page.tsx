import Link from "next/link";
import { Breadcrumbs, Button, Card, Container, Grid, Typography } from "@mui/material";
import TrackList from "@/app/features/tracks/TrackList";

export default function Page() {
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
          <Card sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            padding: "8px 12px",
            marginBottom: "12px"
          }}>
            <Typography variant="h2">Track list</Typography>
            <Button>
              <Link href="/tracks/create">
                Upload
              </Link>
            </Button>
          </Card>
          <TrackList/>
        </Grid>
      </Container>
    </Container>
  );
};