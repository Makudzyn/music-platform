import Link from "next/link";
import { Breadcrumbs, Button, Card, Container, Grid, Typography } from "@mui/material";
import TrackList from "@/app/features/tracks/TrackList";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import IconWrapper from "@/app/features/player/IconWrapper";

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
            <IconWrapper>
              <Link href="/tracks/upload">
                <UploadFileOutlinedIcon sx={{width: 32, height: 32, color: "green"}}/>
              </Link>
            </IconWrapper>
          </Card>
          <TrackList/>
        </Grid>
      </Container>
    </Container>
  );
};