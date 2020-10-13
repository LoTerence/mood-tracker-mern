import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { Grid, Typography } from "@material-ui/core";
import { formatDateTitle } from "../../utils/convertDateString";

export default function EntryView() {
  const { currentEntry } = useContext(GlobalContext);

  return (
    <>
      <Grid container item xs={12} justify="left">
        <Typography variant="h3" color="primary">
          {formatDateTitle(currentEntry.createdAt)}
        </Typography>
      </Grid>
    </>
  );
}
