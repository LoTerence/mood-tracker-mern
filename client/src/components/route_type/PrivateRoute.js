import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../../context/auth";

function PrivateRoute({ component: Component, ...rest }) {
  const authToken = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        authToken ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login" }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
