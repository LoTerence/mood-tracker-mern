import React, { useContext } from "react";
import { Redirect, withRouter } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useAuth } from "../../context/auth";
import { GlobalContext } from "../../context/GlobalState";

function Dashboard(props) {
  const { authToken, user } = useAuth();
  const { journal, getJournal } = useContext(GlobalContext)

  if (!authToken) {
    return <Redirect to="/login" />;
  }

  getJournal();

  return (
    <div>
      <h1>This is the Dashboard</h1>
      {user ? (<p>{user.username}</p>) : (<p>loading user..</p>)}
      
      <ul>
      {journal.map((entry) => <li>{entry.moodColor}</li>)}
      </ul>
    </div>
  );
}

export default withRouter(Dashboard);
