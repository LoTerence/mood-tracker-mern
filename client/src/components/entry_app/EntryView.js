import React, { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalState";
import {
  Grid,
  Typography,
  Paper,
  Button,
  ButtonGroup,
} from "@material-ui/core";
import { formatDateTitle } from "../../utils/convertDateString";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

export default function EntryView() {
  const { currentEntry, changeCurrentEntry, displayContent, deleteEntry } = useContext(GlobalContext);
  const [delWarningOn, setDelWarningOn] = useState(false);

  function handleClickEdit() {
    displayContent("EditEntry");
  }

  function handleClickDelete() {
    deleteEntry(currentEntry._id);
    changeCurrentEntry({});
    displayContent("Home");
  }

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
          style={{
            margin: "10px",
            width: "100px",
            height: "100px",
            background: currentEntry.moodColor,
          }}
        ></Paper>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleClickEdit()}
        startIcon={<EditIcon />}
      >
        Edit Mood Entry
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setDelWarningOn(true)}
        startIcon={<DeleteForeverIcon />}
      >
        Delete Entry
      </Button>
      {delWarningOn ? (
        <div>
          <p>
            Are you sure you want to delete this entry? You will NOT be able to
            reverse this action
          </p>
          <ButtonGroup>
            <Button color="primary" onClick={() => setDelWarningOn(false)}>
              No, cancel
            </Button>
            <Button
              color="secondary"
              startIcon={<DeleteForeverIcon />}
              onClick={() => handleClickDelete()}
            >
              Yes, Delete
            </Button>
          </ButtonGroup>
        </div>
      ) : null}
    </>
  );
}
