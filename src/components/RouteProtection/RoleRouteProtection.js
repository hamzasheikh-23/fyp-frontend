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
  // localStorage.setItem('isAuthenticated', true);
  // localStorage.setItem('userType', 'admin');
  // localStorage.setItem('admin', true);
  // const isAuthenticated = true; 
  // const userType = 'admin'; 

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
