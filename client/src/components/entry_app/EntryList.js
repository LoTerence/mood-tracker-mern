import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { makeStyles } from "@material-ui/core/styles";
import { Drawer, List, Divider, Toolbar } from "@material-ui/core";
import EntryItem from "./EntryItem";
import NewEntryButton from "./NewEntryButton";

const drawerWidth = 200;

const useStyles = makeStyles(() => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    zIndex: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
}));

function EntryList() {
  const { journal, getJournal } = useContext(GlobalContext);
  const classes = useStyles();

  useEffect(() => {
    getJournal();
  }, [getJournal]);

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <List>
        <NewEntryButton />
      </List>
      <div className={classes.drawerContainer}>
        <List>
          <Divider />
          {journal.map((entry) => (
            <EntryItem entry={entry} key={entry._id} />
          ))}
        </List>
      </div>
    </Drawer>
  );
}

export default EntryList;
