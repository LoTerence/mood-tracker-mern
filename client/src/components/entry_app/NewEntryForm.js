import React, { useState, useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import {
  Typography,
  Button,
  Grid,
  TextField,
  FormLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormHelperText,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

function NewEntryForm() {
  const { addEntry, displayContent } = useContext(GlobalContext);
  const [question1, setQuestion1] = useState("");
  const [question2, setQuestion2] = useState("");
  const [question3, setQuestion3] = useState("");
  const [question4, setQuestion4] = useState("");
  const [moodColor, setMoodColor] = useState("");
  const [colorHelperText, setColorHelperText] = useState(""); // for helping to make sure one of the mood color radio buttons is picked
  const [colorErr, setColorErr] = useState(false); // for helping to make sure one of the mood color radio buttons is picked

  const handleRadioChange = (event) => {
    setMoodColor(event.target.value);
    setColorHelperText(" ");
    setColorErr(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (moodColor === "") {
      setColorHelperText("Please select an option.");
      setColorErr(true);
      return;
    }

    const newEntry = {
      body: {
        question1,
        question2,
        question3,
        question4,
      },
      moodColor,
    };
    addEntry(newEntry);
  };

  return (
    <>
      <Grid container item xs={12} justify="center">
        <Typography variant="h3" color="primary">
          New Daily Mood Entry
        </Typography>
      </Grid>
      <Grid container item direction="column" alignItems="stretch" xs={12}>
        <Typography variant="body1">What did you do today? </Typography>
        <TextField
          placeholder="What happened today?"
          name="question1"
          value={question1}
          onChange={(e) => setQuestion1(e.target.value)}
        />
      </Grid>
      <Grid container item direction="column" alignItems="stretch" xs={12}>
        <Typography variant="body1">How are you feeling right now? </Typography>
        <TextField
          placeholder="What are your current emotions?"
          name="question2"
          value={question2}
          onChange={(e) => setQuestion2(e.target.value)}
        />
      </Grid>
      <Grid container item direction="column" alignItems="stretch" xs={12}>
        <Typography variant="body1">Where do you want to go? </Typography>
        <TextField
          placeholder="What are you going to do tomorrow?"
          name="question3"
          value={question3}
          onChange={(e) => setQuestion3(e.target.value)}
        />
      </Grid>
      <Grid container item direction="column" alignItems="stretch" xs={12}>
        <Typography variant="body1">
          What words do you need to hear right now?{" "}
        </Typography>
        <TextField
          placeholder="Keep on going! "
          name="question4"
          value={question4}
          onChange={(e) => setQuestion4(e.target.value)}
        />
      </Grid>
      <Grid container item direction="column" alignItems="stretch" xs={12}>
        <FormControl component="fieldset" error={colorErr}>
          <FormLabel component="legend">What color is your mood? </FormLabel>
          <RadioGroup
            aria-label="gender"
            name="gender1"
            value={moodColor}
            onChange={handleRadioChange}
          >
            <FormControlLabel
              value="#28df99"
              control={<Radio />}
              label="green"
            />
            <FormControlLabel
              value="#99f3bd"
              control={<Radio />}
              label="light green"
            />
            <FormControlLabel
              value="#fff8cd"
              control={<Radio />}
              label="yellow"
            />
            <FormControlLabel
              value="#e97171"
              control={<Radio />}
              label="light red"
            />
            <FormControlLabel value="#ff4b5c" control={<Radio />} label="red" />
          </RadioGroup>
          <FormHelperText>{colorHelperText}</FormHelperText>
        </FormControl>
      </Grid>
      <Grid container item direction="column" alignItems="stretch" xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => handleSubmit(e)}
          startIcon={<SaveIcon />}
        >
          Save New Mood Entry
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={(e) => displayContent("Home")}
          startIcon={<SaveIcon />}
        >
          Cancel / Discard New Entry
        </Button>
      </Grid>
    </>
  );
}

export default NewEntryForm;

/*
Component that represents the UI window that lets the user save a new Entry into their journal
It should have mood color selecting input
Save button should call post method to server in globalstate
*/
