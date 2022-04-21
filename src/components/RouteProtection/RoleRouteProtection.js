import React from "react";
import { Redirect, Route } from "react-router-dom";

export default function RoleRouteProtection({
  component: Component,
  redirectTo,
  validUser,
  ...restOfProps
}) {
  const isAuthenticated = JSON.parse(localStorage.getItem("isAuthenticated"));
  const userType = localStorage.getItem("loginType");
  console.log("role route", isAuthenticated, userType);

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated && userType === validUser  ? (
          <Component {...props} />
        ) : (
          <Redirect to={redirectTo || "/unauthorized"} />
        )
      }
    />
  );
}
