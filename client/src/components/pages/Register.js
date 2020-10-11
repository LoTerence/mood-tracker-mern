import React, { useState } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import axios from "axios";
import { Grid, Card, Typography, Button, TextField } from "@material-ui/core";
import { useAuth } from "../../context/auth";

function Register() {
  const [isError, setIsError] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const { setAuthToken, setUser, authToken } = useAuth();

  function postRegister() {
    if (password !== password2) {
      alert("Passwords do not match");
      setIsError(true);
      return;
    }

    axios
      .post("auth/", {
        username: userName,
        password,
      })
      .then((result) => {
        if (result.status === 201) {
          setAuthToken(result.data.token);
          setUser(result.data.data);
        } else {
          alert(result.message);
          setIsError(true);
        }
      })
      .catch((err) => setIsError(true));
  }

  const components = [
    <TextField
      placeholder="Username"
      name="username"
      value={userName}
      onChange={(e) => setUserName(e.target.value)}
      key="0"
    />,
    <TextField
      placeholder="Password"
      name="password"
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      key="1"
    />,
    <TextField
      placeholder="Re-type Password"
      name="password2"
      type="password"
      value={password2}
      onChange={(e) => setPassword2(e.target.value)}
      key="2"
    />,
    <Button
      variant="contained"
      color="primary"
      onClick={() => postRegister()}
      key="3"
    >
      Sign Up
    </Button>,
  ];

  if (authToken) {
    return <Redirect to={"/dashboard"} />;
  }

  return (
    <Grid
      container
      direction="row"
      item
      xs={12}
      justify="center"
      alignItems="center"
      style={{ height: "100%" }}
    >
      <Grid
        container
        direction="column"
        alignItems="stretch"
        justify="center"
        component={Card}
        item
        spacing={3}
        xs={8}
        md={4}
        style={{ padding: "20px" }}
      >
        <Grid container item xs={12} justify="center">
          <Typography variant="h3">Sign Up</Typography>
        </Grid>
        {components.map((component, i) => {
          return (
            <Grid
              container
              item
              direction="column"
              xs={12}
              alignItems="stretch"
              key={i}
            >
              {component}
            </Grid>
          );
        })}

        <Link to="/login">Have an account? Log in</Link>
        {isError && <p>Username already taken or passwords do not match</p>}
      </Grid>
    </Grid>
  );
}

export default withRouter(Register);
