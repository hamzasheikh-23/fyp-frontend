import React from "react";
import { Redirect, Route } from "react-router-dom";

export default function DoubleLoginProtection({
  component: Component,
  redirectTo,
  condition,
  ...restOfProps
}) {
  const isAuthenticated = JSON.parse(localStorage.getItem("isAuthenticated"));
  console.log("protected route", isAuthenticated);

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        !isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={redirectTo || "/"} />
        )
      }
    />
  );
}
