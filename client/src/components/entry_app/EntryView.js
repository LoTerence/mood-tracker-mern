import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { Grid, Typography, Paper } from "@material-ui/core";
import { formatDateTitle } from "../../utils/convertDateString";

export default function EntryView() {
  const { currentEntry } = useContext(GlobalContext);

  return (
    <>
      <Grid container item xs={12}>
        <Typography variant="h3" color="primary">
          {formatDateTitle(currentEntry.createdAt)}
        </Typography>
      </Grid>
      <Grid container item direction="column" alignItems="stretch" xs={12}>
        <Typography variant="h6">What you did this day </Typography>
        <Typography variant="body1">{currentEntry.body.question1}</Typography>
      </Grid>
      <Grid container item direction="column" alignItems="stretch" xs={12}>
        <Typography variant="h6">How you felt this day </Typography>
        <Typography variant="body1">{currentEntry.body.question2}</Typography>
      </Grid>
      <Grid container item direction="column" alignItems="stretch" xs={12}>
        <Typography variant="h6">
          What you were trying to achieve this day{" "}
        </Typography>
        <Typography variant="body1">{currentEntry.body.question3}</Typography>
      </Grid>
      <Grid container item direction="column" alignItems="stretch" xs={12}>
        <Typography variant="h6">
          What words you needed to hear this day{" "}
        </Typography>
        <Typography variant="body1">{currentEntry.body.question4}</Typography>
      </Grid>
      <Grid container item direction="column" alignItems="stretch" xs={12}>
        <Typography variant="h6">
          The color of your mood on this day{" "}
        </Typography>
        <Paper
          style={{ margin: "10px", width: "100px", height: "100px", background: currentEntry.moodColor }}
        ></Paper>
      </Grid>
    </>
  );
}
