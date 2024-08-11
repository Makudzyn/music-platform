import { Box, Card, Grid } from "@mui/material";
import { Track } from "@/app/lib/defenitions";
import TrackItem from "@/app/ui/tracks/TrackItem";

interface TrackListProps {
  tracks: Track[];
}

export default function TrackList({tracks}: TrackListProps) {
  return (
    <Grid container direction="column">
      <Box py={3}>
        {tracks.map(track => (
            <TrackItem key={track._id} track={track}/>
          )
        )}
      </Box>
    </Grid>
  );
};