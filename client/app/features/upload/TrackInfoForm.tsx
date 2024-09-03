import { Box, Card, FormControl, TextField } from "@mui/material";
import styled from "@emotion/styled";
import GradeRoundedIcon from '@mui/icons-material/GradeRounded';
import LyricsRoundedIcon from '@mui/icons-material/LyricsRounded';
import MusicNoteRoundedIcon from '@mui/icons-material/MusicNoteRounded';
import { ChangeEvent } from "react";

// Стили для Card компонента
const StyledCard = styled(Card)(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

// Стили для FormControl компонента
const StyledFormControl = styled(FormControl)(({ theme }) => ({
  height: "100%",
  width: "40%",
  position: 'relative',
  display: "flex",
  justifyContent: "space-evenly",
  flexDirection: "column",
  alignItems: "center",
}));

// Стили для Box компонента, содержащего иконку и поле ввода
const InputBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
}));

// Стили для иконок
const StyledIcon = styled.div(({ theme }) => ({
  fontSize: 28,
  color: theme.palette.grey[500],
  margin: theme.spacing(1),
}));

interface TrackInfoFormProps {
  trackInfo: { artist: string; title: string; lyrics: string };
  setTrackInfo: (info: { artist: string; title: string; lyrics: string }) => void;
}

export default function TrackInfoForm({ trackInfo, setTrackInfo }: TrackInfoFormProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTrackInfo(prev => ({ ...prev, [name]: value }));
  };

  return (
    <StyledCard>
      <StyledFormControl>
        <InputBox>
          <StyledIcon><GradeRoundedIcon /></StyledIcon>
          <TextField
            fullWidth
            size="small"
            required
            name="artist"
            id="artist-input"
            label="Artist"
            onChange={handleChange}
            defaultValue={trackInfo.artist}
            placeholder="Enter track's artist..."
            variant="filled"
            color="success"
          />
        </InputBox>
        <InputBox>
          <StyledIcon><MusicNoteRoundedIcon /></StyledIcon>
          <TextField
            fullWidth
            size="small"
            required
            name="title"
            id="title-input"
            label="Title"
            onChange={handleChange}
            defaultValue={trackInfo.title}
            placeholder="Enter track's title..."
            variant="filled"
            color="success"
          />
        </InputBox>
        <InputBox>
          <StyledIcon><LyricsRoundedIcon /></StyledIcon>
          <TextField
            fullWidth
            size="small"
            multiline
            maxRows={6}
            name="lyrics"
            id="lyrics-input"
            label="Lyrics"
            onChange={handleChange}
            defaultValue={trackInfo.lyrics}
            placeholder="Enter track's lyrics..."
            variant="filled"
            color="success"
          />
        </InputBox>
      </StyledFormControl>
    </StyledCard>
  );
}
