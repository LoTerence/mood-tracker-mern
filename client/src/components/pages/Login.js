import React, { useState } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import axios from "axios";
import { Grid, Card, Typography, Button, TextField } from "@material-ui/core";
import { useAuth } from "../../context/auth";
import Appbar from "../appbar/Appbar";

function Login() {
  const [isError, setIsError] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { authToken, setAuthToken, setUser } = useAuth();

  if (authToken) {
    return <Redirect to={"/dashboard"} />;
  }

  function postLogin() {
    axios
      .post("auth/login", {
        username: userName,
        password,
      })
      .then((result) => {
        if (result.status === 201) {
          setAuthToken(result.data.token);
          setUser(result.data.data);
        } else {
          alert(result.data.error);
          setIsError(true);
        }
      })
      .catch((err) => {
        setIsError(true);
      });
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
      required
      onChange={(e) => setPassword(e.target.value)}
      key="1"
    />,
    <Button
      variant="contained"
      color="primary"
      onClick={() => postLogin()}
      key="2"
    >
      Sign In
    </Button>,
  ];

  return (
    <Grid
      container
      direction="row"
      item
      xs={12}
      justify="center"
      alignItems="center"
      style={{ position: "relative", height: "100%", top: "100px" }}
    >
      <Appbar />
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
          <Typography variant="h3">Sign In</Typography>
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
        <Link to="/register">Don't have an account? Sign up</Link>
        <p>Use username: testuser1, password: 123456, for testing and seeing the app</p>
        {isError && <p>The username or password provided were incorrect!</p>}
      </Grid>
    </Grid>
  );
}

export default withRouter(Login);
