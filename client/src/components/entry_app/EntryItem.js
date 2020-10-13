import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { ListItem, ListItemText } from "@material-ui/core";
import { formatDate } from "../../utils/convertDateString";

function EntryItem(props) {
  const { displayContent, changeCurrentEntry } = useContext(GlobalContext);
  const { createdAt, moodColor } = props.entry;

  function handleClick() {
    changeCurrentEntry(props.entry);
    displayContent("EntryView");
  }

  return (
    <ListItem button style={{ background: moodColor }} onClick={handleClick}>
      <ListItemText primary={formatDate(createdAt)} />
    </ListItem>
  );
}

export default EntryItem;

/*
should be the color of the mood color
show the date first
clicking on it renders a entryview component that has the entry body in it
*/
