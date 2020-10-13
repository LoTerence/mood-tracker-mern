import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { Grid, Toolbar, Card } from "@material-ui/core";
import Home from "./Home";
import NewEntryForm from "./NewEntryForm";
import EntryView from "./EntryView";

/* changes content component depending on what button in the global app is clicked, based on contentComponent property in Global state */

export default function ContentArea() {
  const { contentComponent } = useContext(GlobalContext);

  function renderContent() {
    switch (contentComponent) {
      case "Home":
        return <Home />;
      case "NewEntryForm":
        return <NewEntryForm />;
      case "EntryView":
        return <EntryView/>;
      default:
        return <Home />;
    }
  }

  return (
    <Grid
      container
      item
      direction="row"
      xs={12}
      sm={12}
      md={9}
      justify="center"
      alignItems="center"
      style={{
        position: "relative",
        flexGrow: 1,
        padding: "20px 10px",
      }}
    >
      <Toolbar />
      <Grid
        container
        item
        direction="column"
        alignItems="stretch"
        justify="center"
        component={Card}
        spacing={2}
        xs={12}
        style={{ padding: "0px 20px 20px" }}
      >
        {renderContent()}
      </Grid>
    </Grid>
  );
}
