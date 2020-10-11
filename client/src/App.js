import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./components/route_type/PrivateRoute";
import { AuthContext } from "./context/auth";
import { GlobalProvider } from "./context/GlobalState";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Dashboard from "./components/pages/Dashboard";
import Appbar from "./components/appbar/Appbar";

function App() {
  const existingToken = localStorage.getItem("token") || ""; // might need to json.parse this if its a str
  const [authToken, setAuthToken] = useState(existingToken);
  const existingUser = JSON.parse(localStorage.getItem("userData")) || {}; 
  const [user, setUser] = useState(existingUser);

  const setToken = (data) => {
    if (!data) {
      localStorage.removeItem("token");
      setAuthToken();
    } else {
      setAuthToken(data);
      localStorage.setItem("token", data);
    }
  };

  const setUserData = (data) => {
    if (!data) {
      localStorage.removeItem("userData");
      setUser();
    } else {
      setUser(data);
      localStorage.setItem("userData", JSON.stringify(data));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authToken,
        setAuthToken: setToken,
        user,
        setUser: setUserData,
      }}
    >
      <GlobalProvider>
        <BrowserRouter>
          <Appbar />
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
        </BrowserRouter>
      </GlobalProvider>
    </AuthContext.Provider>
  );
}

export default App;
