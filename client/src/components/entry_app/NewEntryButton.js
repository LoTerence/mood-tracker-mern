import React, { useContext }  from "react";
import { GlobalContext } from "../../context/GlobalState";
import { Button, ListItem }from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";

function NewEntryButton() {
  const { displayContent } = useContext(GlobalContext);

  return (
    <ListItem >
      <Button startIcon={<CreateIcon />} color="primary" variant="contained"
      onClick={() => displayContent("NewEntryForm")}
      >
        New Entry
      </Button>
    </ListItem>
  );
}

export default NewEntryButton;

/*
Clicking on this button opens a window in content area that allows user to create a new entry
*/
