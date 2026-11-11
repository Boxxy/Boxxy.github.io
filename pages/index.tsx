import * as React from "react";
import type { NextPage } from "next";
import Typography from "@mui/material/Typography";
import {
  Autocomplete,
  Button,
  Container,
  IconButton,
  TextField,
} from "@mui/material";
import { PlayCircle, Stop } from "@mui/icons-material";
import sampleSongs from "../data/sampleSongs";
import { Song } from "../data/Song";

const trackNumber = Math.floor(Math.random() * sampleSongs.length);

const Home: NextPage = () => {
  const answer = sampleSongs[trackNumber];
  const songUrl: string = "./" + answer.fileName;

  const [playing, setPlaying] = React.useState(false);
  const [audio] = React.useState(
    typeof Audio !== "undefined" ? new Audio(songUrl) : undefined
  );
  const [guess, setGuess] = React.useState<Song | null>(null);

  const handlePlay = () => {
    if (!playing) {
      setPlaying(true);
      if (audio != null) {
        audio.play();
      }
    }
  };

  const handlePause = () => {
    if (playing) {
      setPlaying(false);
      if (audio != null) {
        audio.pause();
      }
    }
  };

  const handleSubmit = () => {
    if (guess == answer) {
      alert('Correct it was "' + answer.title + '" by ' + answer.artist);
    } else {
      alert("Wrong it was " + answer.title + " by " + answer.artist);
    }
  };

  return (
    <Container>
      <Typography variant="h1" component="div" gutterBottom>
        Beardle
      </Typography>
      {!playing && (
        <IconButton onClick={handlePlay}>
          <PlayCircle />
        </IconButton>
      )}
      {playing && (
        <IconButton onClick={handlePause}>
          <Stop />
        </IconButton>
      )}
      <Autocomplete
        disablePortal
        id="guess-box"
        options={sampleSongs}
        onChange={(event, value) => setGuess(value)}
        getOptionLabel={(song) => song.artist + " - " + song.title}
        sx={{ width: 800 }}
        renderInput={(params) => <TextField {...params} label="Guess" />}
      />
      <Button variant="outlined">Skip</Button>
      <Button
        variant="contained"
        disabled={guess == null}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Container>
  );
};

export default Home;
