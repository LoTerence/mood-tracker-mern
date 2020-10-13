import React from "react";
import { Redirect, withRouter } from "react-router-dom";
import { useAuth } from "../../context/auth";
import Appbar from "../appbar/Appbar";
import EntryList from "../entry_app/EntryList";
import ContentArea from "../entry_app/ContentArea";

function Dashboard() {
  const { authToken } = useAuth();

  if (!authToken) {
    return <Redirect to="/login" />;
  }

  return (
    <div style={{ display: "flex", overflow:"auto" }}>
      <Appbar />
      <EntryList />
      <ContentArea />
    </div>
  );
}

export default withRouter(Dashboard);
