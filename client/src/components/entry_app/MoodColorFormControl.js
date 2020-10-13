import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormHelperText,
} from "@material-ui/core";

function MoodColorFormControl(props) {
  const [colorHelperText, setColorHelperText] = useState(" "); // for helping to make sure one of the mood color radio buttons is picked
  const [colorErr, setColorErr] = useState(false); // for helping to make sure one of the mood color radio buttons is picked

  const handleRadioChange = (event) => {
    setMoodColor(event.target.value);
    setColorHelperText(" ");
    setColorErr(false);
  };

  return (
    <FormControl component="fieldset" error={colorErr}>
      <FormLabel component="legend">What color is your mood? </FormLabel>
      <RadioGroup
        aria-label="gender"
        name="gender1"
        value={moodColor}
        onChange={handleRadioChange}
      >
        <FormControlLabel value="#28df99" control={<Radio />} label="green" />
        <FormControlLabel
          value="#99f3bd"
          control={<Radio />}
          label="light green"
        />
        <FormControlLabel value="#fff8cd" control={<Radio />} label="yellow" />
        <FormControlLabel
          value="#e97171"
          control={<Radio />}
          label="light red"
        />
        <FormControlLabel value="#ff4b5c" control={<Radio />} label="red" />
      </RadioGroup>
      <FormHelperText>{colorHelperText}</FormHelperText>
    </FormControl>
  );
}

export default MoodColorFormControl;

/* 
Functional component representing the Form control for selecting the mood color in new entry/ edit entry
*/
