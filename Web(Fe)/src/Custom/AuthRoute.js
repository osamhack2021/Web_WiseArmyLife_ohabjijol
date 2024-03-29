import React from "react";
import { Route, Redirect } from "react-router-dom";

function AuthRoute({ auth, component: Component, render, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        auth ? (
          render ? (
            render(props)
          ) : (
            <Component {...props} />
          )
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

export default AuthRoute;