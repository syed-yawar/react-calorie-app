import React from "react";
import { Redirect, Route } from "react-router-dom";

import { useJwtData } from "../../hooks";

export const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  const [isLoading, isAuthenticated] = useJwtData();
  if (isLoading) {
    return (
      <div>
        <p>Initialising ...</p>
      </div>
    );
  }
  return (
    <Route
      {...rest}
      render={props => (restricted && isAuthenticated ? <Redirect to="/" /> : <Component {...props} />)}
    />
  );
};
