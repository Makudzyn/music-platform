import Link from "next/link";
import { Box, Breadcrumbs, Button, Card, Container, Grid, Typography } from "@mui/material";
import TrackList from "@/app/features/tracks/TrackList";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import IconWrapper from "@/app/features/player/IconWrapper";
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import Divider from "@mui/material/Divider";

export default function Page() {
  return (
    <Container maxWidth="lg">
      <Breadcrumbs aria-label="breadcrumb" sx={{marginBottom: "10px"}}>
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Typography color="text.primary">Tracks</Typography>
      </Breadcrumbs>
      <Box>
        <Box sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          padding: "6px 0px",
          marginBottom: "2px",
        }}>
          <Typography variant="h2">Track list</Typography>
          <IconWrapper>
            <Link href="/tracks/upload">
              <UploadFileOutlinedIcon sx={{width: 32, height: 32, color: "green"}}/>
            </Link>
          </IconWrapper>
        </Box>
        <Container sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}>
          <Box sx={{
            display: "flex",
            flexWrap: "nowrap",
            flexDirection: "row",
            paddingY: "4px",
            marginBottom: "4px",
          }}>
            <div className="min-w-6 mx-1 flex justify-center items-center">#</div>
            <div className="min-w-80 mx-1 flex justify-start items-center">Title</div>
            <div className="min-w-72 flex mx-1 justify-start items-center">Artist</div>
            <div className="min-w-48 flex mx-1 justify-start items-center">Date Added</div>
            <div className="min-w-28 flex mx-1 justify-start items-center">Current</div>
            <div className="w-full flex mx-1 justify-center items-center">
              <AccessTimeRoundedIcon sx={{width: 24, height: 24}}/>
            </div>
          </Box>

          <Divider/>
        </Container>
        <TrackList/>
      </Box>
    </Container>
  );
};