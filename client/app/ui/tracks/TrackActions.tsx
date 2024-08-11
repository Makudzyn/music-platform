'use client';

import { PauseOutlined, PlayArrowOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";

interface TrackActionsProps {
  active?: boolean;
}

export default function TrackActions({active}: TrackActionsProps) {
  return (
    <IconButton
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      {active ? <PauseOutlined/> : <PlayArrowOutlined/>}
    </IconButton>
  );
};